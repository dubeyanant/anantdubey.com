---
title: "Creating pinned shortcuts in Flutter!"
date: "2024-03-21"
summary: "create pinned shortcuts in flutter using platform channels and native android"
tags: ["Flutter","Android","Kotlin"]
---

## Introduction

There are three types of shortcuts in Android that can be implemented in Flutter: static, dynamic, and pinned. You can read more about these shortcuts in the Android documentation by clicking [here](https://developer.android.com/develop/ui/views/launch/shortcuts/creating-shortcuts).

![](https://developer.android.com/static/images/guide/topics/ui/shortcuts/pinned-shortcuts.png)

In this article, we are going to create pinned shortcuts in Flutter. We will see this example for the use case where we'll launch a different screen if clicked on the pinned shortcut instead of the home screen, which opens by default in the app.

As there is no direct provision for creating pinned shortcuts in Flutter, we are going to use native bridge (platform channels) between Flutter and Android Native to establish two-way communication. I'll not be going in depth on the creation of platform channels for data transfer, but you can see the full approach with code in my previous article [here](/writing/native-bridge).

**Note** that I'll be using Kotlin as my native Android language.

## Approach

1.  Establish a native bridge between Flutter and Android.
    
2.  Send an identifier from Flutter to Android.
    
3.  Create a pinned shortcut using the previous identifier.
    
4.  Send a call back to Flutter if the pinned shortcut is clicked.
    
5.  Inflate a screen using that callback in Flutter.
    

### Steps in detail

**Step 0: Project starting point**

Before creating any pinned shortcuts, we will essentially create a starting point. Click [here](https://github.com/dubeyanant/pinned_shortcuts/tree/a50a56850ded99e957705b654786b4ef79aa8841) for the initial code I will be using. Don't worry if you do not want to fork the repository; its lib folder only has the files `main.dart` and `home.dart`.

The `main.dart` file contains the basic structure of the `MaterialApp`.

[https://gist.github.com/inanant/58a43263745085ebbe513ac6fbe56f60](https://gist.github.com/inanant/58a43263745085ebbe513ac6fbe56f60)

The `home.dart` files contain the `HomeScreen` widget, which has a button whose `onTap` takes users to an `AnotherScreen` widget with plain text; `onLongPress` is currently an empty function.

[https://gist.github.com/inanant/82fb0db54832e2b14859a83020d9022f](https://gist.github.com/inanant/82fb0db54832e2b14859a83020d9022f)

**Step 1 & 2: Create platform channels and send an identifier**

To determine which screen to open, we will transfer a string using a native bridge that connects Flutter and Android. You can use any type of identifier, such as a string, integer, or bool, based on your use case. Although we only have one screen at the moment, sending distinct identifiers when making distinct pinned shortcuts is crucial to determining what action should happen when a given shortcut is clicked.

We'll be manipulating `MainActivity.kt` and `home.dart` files in order to do this.

In `MainActivity.kt`, we'll write a method channel to receive the information that is passed from Flutter. It is done by overriding the `configureFlutterEngine` function to receive the data and creating a function to actually use that data to create a pinned shortcut. For now, we'll use the `getNativeData` function just to return the data we received.

[https://gist.github.com/inanant/cb0179b5e738a1f0dccf279728c32e61](https://gist.github.com/inanant/cb0179b5e738a1f0dccf279728c32e61)

Also, we will create a `NativeBridge` class in the `home.dart` file to transfer the data to the Kotlin file. In the `onLongPress` method call, don't forget to call the `getNativeData` method to send string data to Android by writing `NativeBridge.getNativeData('Another Screen')`. Here, "_Another Screen_" string will act as our identifer.

[https://gist.github.com/inanant/ca0d6157d0d29d14236f7442349fbf05](https://gist.github.com/inanant/ca0d6157d0d29d14236f7442349fbf05)

This causes the console to display a print log statement that reads, "_From Native: Another Screen_." This indicates that, up until now, everything has been going well.

Click [here](https://github.com/dubeyanant/pinned_shortcuts/tree/f43437c9305f90e721095597758c6ece307ebefe) to get the complete source code up to this point.

**Step 2.5: Adding some additional files**

There are some other things that you might want to do if something doesn't work. The first is adding dependencies to `app/build.gradle`.

[https://gist.github.com/inanant/dfa23eb188b487bfd42c4e32e1ce6ce6](https://gist.github.com/inanant/dfa23eb188b487bfd42c4e32e1ce6ce6)

Another thing you should do is add a png file to the `drawable` folder in the `android/app/src/main/res/` folder so that it can be used as the shortcut's icon. I've used [this](https://github.com/dubeyanant/pinned_shortcuts/blob/main/android/app/src/main/res/drawable/page.png) file.

**Step 3 & 4: Create a pinned shortcut**

We'll be creating `Shortcuts.kt`, and changing `MainActivity.kt` a little bit to create pinned shortcuts.

In `Shortcuts.kt`, we're doing two things. First is creating an actual shortcut item by passing a shortcut name to `setShortLabel`, a short description to `setLongLabel`, and an icon to `setIcon`, these will be sent to `ShortcutInfo.Builder`. We'll use the icon image we've put in the `drawable/` folder.

The second thing is sending the identifier string back to `MainActivity.kt` using `intent.putExtra`, which will be later used to send a callback to Flutter.

[https://gist.github.com/inanant/3d10e525cf3de66ac28e4547c8f54124](https://gist.github.com/inanant/3d10e525cf3de66ac28e4547c8f54124)

After this, we will change the `MainActivity.kt` to call the `setUp` function in the `Shortcuts.kt`. Here, I've changed the method name from `getNativeData` to `sendNativeData` and created another `getNativeData` to reflect a better naming convention from the Flutter perspective.

`sendNativeData` gets the data that is sent from Flutter and uses it to create pinned shortcuts by first calling the `Shortcuts.setUp` function and then calling the `shortcutPin` function for the `shortcutManager` initialization. `getNativeData` basically sends the callback to Flutter with the identifier `screenNames`.

Here I've created `screenNames` as a mutable list, but you can also create it as a string because, at the end, we're fetching the callback data with the help of `screenNames[0]`.

Because `FlutterActivity` runs before `onCreate`, it should also be noted that `intent.extras` is called in `FlutterActivity` and not in `onCreate`. The original data that is associated with that specific pinned shortcut is stored in the `intent.extras` variable before being saved in the `screenNames` variable.

[https://gist.github.com/inanant/6cf3e8dc4d1614adbea8d3334be4e4c5](https://gist.github.com/inanant/6cf3e8dc4d1614adbea8d3334be4e4c5)

**Step 5: Inflate another screen**

To accommodate two functions, we will now modify the `home.dart` file. `sendNativeData`, which will only send string data, and `getNativeData`, which will receive the callback from Android and have the screen launch code.

[https://gist.github.com/inanant/cbc941b31edd35f25c047dfd74f87edd](https://gist.github.com/inanant/cbc941b31edd35f25c047dfd74f87edd)

**Note** that `onLongPress` has been changed to `NativeBridge.sendNativeData('Another Screen'),` and we'll need to call the `NativeBridge.getNativeData(context);` function just before the `return Scaffold` statement to get the callback and do the necessary actions.

* * *

Now, if you long press on the button in the app, it will prompt you to create a pinned shortcut with the name "_Another Screen_" and it'll be placed on the mobile home screen. After you terminate the app, clicking on that shortcut from the home screen will take you to the `AnotherScreen`.

![](/writing/pinned-shortcuts-in-flutter/01.gif)

You now know how to create pinned shortcuts in Flutter. If you require the full source code of the project, you can click [here](https://github.com/dubeyanant/pinned_shortcuts). It also contains an additional feature, which is to send a dynamic image for the shortcut icon from Flutter.

* * *

## **Thank you**

Did you reach the bottom? **_Thank you for reading!_**

Feel free to [connect with me](https://bio.link/aanant). 👋