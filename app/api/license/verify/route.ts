import { NextRequest, NextResponse } from "next/server";

const VERIFY_URL =
  "https://nodijpmukvclftlegyyu.supabase.co/functions/v1/verify-license-internal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { ok: true, service: "churchstudio-license-verify" },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const licenseKey =
      typeof body?.license_key === "string"
        ? body.license_key.trim().toUpperCase()
        : "";

    if (!licenseKey || licenseKey.length < 8 || licenseKey.length > 80) {
      return NextResponse.json(
        { ok: true, valid: false, reason: "invalid_format" },
        { status: 200, headers: { "Cache-Control": "no-store" } },
      );
    }

    const upstream = await fetch(VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ license_key: licenseKey }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    const data = await upstream.json().catch(() => ({
      ok: false,
      valid: false,
      error: "invalid_upstream_response",
    }));

    return NextResponse.json(data, {
      status: upstream.ok ? 200 : 502,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("ChurchStudio license proxy error", error);
    return NextResponse.json(
      { ok: false, valid: false, error: "server_error" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
