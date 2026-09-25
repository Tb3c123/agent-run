---
name: stack-flutter-android-tv
description: >-
  Use this skill when building Flutter applications for Android TV, Google TV, and FireTV.
  Covers 10-foot UI, D-Pad/Remote FocusNode traversal, FocusTraversalGroup, TV Banners, and Leanback Manifest configurations.
---

# Flutter Android TV Specialized Stack Skill

## 1. 10-Foot UI & Focus System Rules
- **No Touch Gestures**: Never rely on swipe, drag, or pinch gestures. All actions must be reachable via Directional Pad (Up/Down/Left/Right/Select).
- **Explicit Focus Management**:
  - Every interactive widget (Button, Card, Tile) must wrap or manage a `FocusNode`.
  - Use `FocusTraversalGroup` with `OrderedTraversalPolicy` or `DirectionalFocusTraversalPolicy` for structured grid/row navigation.
- **Focus Highlight Visuals**:
  - Focused items must have a clear visual state (e.g., Scale 1.05x, 3px bright border or glow, elevation shadow).
  - Use `AnimatedScale` or `AnimatedContainer` responding to `hasPrimaryFocus`.

## 2. Android TV Manifest & Configuration Requirements
In `android/app/src/main/AndroidManifest.xml`:
```xml
<manifest ...>
    <!-- Declare Leanback Launcher (TV Home screen icon) -->
    <uses-feature
        android:name="android.software.leanback"
        android:required="false" />
    <!-- Touchscreen is NOT required on TV -->
    <uses-feature
        android:name="android.hardware.touchscreen"
        android:required="false" />

    <application
        ...
        android:banner="@drawable/tv_banner"> <!-- 320x180 px banner required -->
        <activity ...>
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

## 3. TV Card Widget Implementation Example
```dart
class TVCardWidget extends StatefulWidget {
  final VoidCallback onSelect;
  final Widget child;

  const TVCardWidget({super.key, required this.onSelect, required this.child});

  @override
  State<TVCardWidget> createState() => _TVCardWidgetState();
}

class _TVCardWidgetState extends State<TVCardWidget> {
  final FocusNode _node = FocusNode();
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _node.addListener(() {
      setState(() => _isFocused = _node.hasFocus);
    });
  }

  @override
  void dispose() {
    _node.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      focusNode: _node,
      onTap: widget.onSelect,
      child: AnimatedScale(
        scale: _isFocused ? 1.08 : 1.0,
        duration: const Duration(milliseconds: 150),
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: _isFocused ? Colors.cyanAccent : Colors.transparent,
              width: 3.0,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: widget.child,
        ),
      ),
    );
  }
}
```
