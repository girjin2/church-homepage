plugins {
    id("com.android.application")
}

android {
    namespace = "com.seojae.church"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.seojae.church"
        minSdk = 23
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }
}
