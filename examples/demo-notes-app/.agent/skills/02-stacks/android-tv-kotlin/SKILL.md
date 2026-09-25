---
name: stack-android-tv-kotlin
description: >-
  Use this skill when developing native Android TV applications with Kotlin, Compose for TV (androidx.tv.material3), or Leanback.
  Covers 10-foot UI, D-Pad Remote focus management, FocusRequester, TV Banner, and Leanback Launcher configs.
---

# Android TV Native Kotlin & Compose for TV Specialized Stack Skill

## 1. 10-Foot UI & Focus Rules for Android TV
- **Dependencies**: Use `androidx.tv:tv-foundation` and `androidx.tv:tv-material`.
- **D-Pad Focus Highlight**:
  - Use `Card` or `Surface` from `androidx.tv.material3` which have built-in TV focus glow, scale, and border behavior.
  - Manage programmatic focus using `FocusRequester()`.
  - Listen to D-Pad hardware key events via `Modifier.onKeyEvent { event -> ... }` (e.g., `KeyEvent.KEYCODE_DPAD_CENTER`, `KEYCODE_DPAD_DOWN`).

## 2. Android TV Manifest Declarations
```xml
<manifest ...>
    <uses-feature
        android:name="android.software.leanback"
        android:required="true" />
    <uses-feature
        android:name="android.hardware.touchscreen"
        android:required="false" />

    <application
        ...
        android:banner="@drawable/tv_banner"> <!-- 320x180 px -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

## 3. Compose for TV Example
```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.tv.material3.Card
import androidx.tv.material3.CardDefaults
import androidx.tv.material3.Text
import androidx.tv.foundation.lazy.list.TvLazyRow
import androidx.tv.foundation.lazy.list.items

@Composable
fun TVMovieCatalog(movies: List<Movie>, onMovieSelected: (Movie) -> Unit) {
    TvLazyRow(modifier = Modifier.padding(16.dp)) {
        items(movies) { movie ->
            Card(
                onClick = { onMovieSelected(movie) },
                scale = CardDefaults.scale(focusedScale = 1.1f),
                border = CardDefaults.border(
                    focusedBorder = Border(border = BorderStroke(3.dp, Color.Cyan))
                ),
                modifier = Modifier.padding(8.dp).size(200.dp, 120.dp)
            ) {
                Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                    Text(text = movie.title)
                }
            }
        }
    }
}
```
