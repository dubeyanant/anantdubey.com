---
title: "Native Bridge between Flutter and Android"
date: "2024-03-19"
summary: "create a native bridge using platform channels between flutter and android in kotlin"
tags: ["platform channels","Flutter","Android","Native bridge","Kotlin","Dart"]
---

## Introduction

We will look at how to create a native bridge between Flutter and Android Native (Kotlin) in this article. I will make this brief and straight to the point.

It should be noted that this bridge will transfer integer data from Flutter to Android and string data from Android to Flutter, but you can use this to transfer other data as well.

## Building Native Bridge

### One-way communication

1.  Build a native bridge in Flutter
    
    1.  Add `services.dart` import
        
        ```
         import 'package:flutter/services.dart';
        ```
        
    2.  Add `NativeBridge` class
        
        ```
         class NativeBridge {
           static const MethodChannel _channel = MethodChannel('com.example/native');
        
           static void getNativeData() async {
             await _channel.invokeMethod('getNativeData').then((value) => print(value));
           }
         }
        ```
        
        First, we are going to create a `NativeBridge` class in which we will write our connection code. The bridge in the native code will be identified by the same name that we are using to create a static `MethodChannel`. The `getNativeData` method in our Kotlin file will be called by the static method `getNativeData()`, which will then print the log statement.
        
    3.  Call `getNativeData()` method
        
        ```
         NativeBridge.getNativeData();
        ```
        
        Call the static method `getNativeData()` anywhere sensible in your Dart code.
        
2.  Connect it's counterpart in `MainActivity.kt`
    
    1.  Add necessary imports
        
        ```
         import io.flutter.embedding.engine.FlutterEngine
         import io.flutter.plugin.common.MethodChannel
        ```
        
    2.  Add this code snippet to `MainActivity` class
        
        ```
         private val CHANNEL = "com.example/native"
        
             override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
                 super.configureFlutterEngine(flutterEngine)
                 MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
                     call, result ->
                     if (call.method == "getNativeData") {
                         val data = getNativeData()
                         result.success(data)
                     } else {
                         result.notImplemented()
                     }
                 }
             }
        
             private fun getNativeData(): String {
                 // Implement your native code logic here
                 return "Native Data from Android"
             }
        ```
        
        The `CHANNEL` name in this case needs to match the `MethodChannel` name in our dart file in order to connect the two channels. For the purpose of determining which method to execute, we now write a simple if-check statement and then execute the required method.
        
3.  Final code files for one-way communication between Flutter and Android
    
    *   `main.dart`
        
        ```
          // ignore_for_file: avoid_print
        
          import 'package:flutter/material.dart';
          import 'package:flutter/services.dart';
        
          void main() => runApp(const MyApp());
        
          class MyApp extends StatelessWidget {
            const MyApp({super.key});
        
            @override
            Widget build(BuildContext context) {
              return MaterialApp(
                title: 'My App',
                theme: ThemeData(
                  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
                  useMaterial3: true,
                ),
                home: const HomePage(),
              );
            }
          }
        
          class NativeBridge {
            static const MethodChannel _channel = MethodChannel('com.example/native');
        
            static void getNativeData() async {
              await _channel.invokeMethod('getNativeData').then((value) => print(value));
            }
          }
        
          class HomePage extends StatelessWidget {
            const HomePage({super.key});
        
            @override
            Widget build(BuildContext context) {
              NativeBridge.getNativeData();
        
              return Scaffold(
                appBar: AppBar(
                  backgroundColor: Theme.of(context).colorScheme.inversePrimary,
                  title: const Text('My App'),
                ),
                body: const Center(
                  child: Text('data'),
                ),
              );
            }
          }
        ```
        
    *   `MainActivity.kt`
        
        ```
          package com.example.bridge
        
          import io.flutter.embedding.android.FlutterActivity
          import io.flutter.embedding.engine.FlutterEngine
          import io.flutter.plugin.common.MethodChannel
        
          class MainActivity: FlutterActivity() {
              private val CHANNEL = "com.example/native"
        
              override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
                  super.configureFlutterEngine(flutterEngine)
                  MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
                      call, result ->
                      if (call.method == "getNativeData") {
                          val data = getNativeData()
                          result.success(data)
                      } else {
                          result.notImplemented()
                      }
                  }
              }
        
              private fun getNativeData(): String {
                  // Implement your native code logic here
                  return "Native Data from Android"
              }
          }
        ```
        

Here, **we have managed to successfully create a one-way connection between Android and Flutter**. In this case, a log statement stating "Native Data from Android," which is coming from Android to Flutter, is printed when the app runs.

### Two-way communication

*   Two-way communication can be achieved by adding a few data type parameters to `_channel.invokeMethod` and making minor adjustments to `getNativeData` method. The finished Dart and Kotlin files are below.
    
    *   `main.dart`
        
        ```
          // ignore_for_file: avoid_print
        
          import 'package:flutter/material.dart';
          import 'package:flutter/services.dart';
        
          void main() => runApp(const MyApp());
        
          class MyApp extends StatelessWidget {
            const MyApp({super.key});
        
            @override
            Widget build(BuildContext context) {
              return MaterialApp(
                title: 'My App',
                theme: ThemeData(
                  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
                  useMaterial3: true,
                ),
                home: const HomePage(),
              );
            }
          }
        
          class NativeBridge {
            static const MethodChannel _channel = MethodChannel('com.example/native');
        
            static void getNativeData(int num) async {
              await _channel.invokeMethod('getNativeData', <String, int>{
                "num": num,
              }).then((value) => print(value));
            }
          }
        
          class HomePage extends StatelessWidget {
            const HomePage({super.key});
        
            @override
            Widget build(BuildContext context) {
              int i = 0;
        
              return Scaffold(
                appBar: AppBar(
                  backgroundColor: Theme.of(context).colorScheme.inversePrimary,
                  title: const Text('My App'),
                ),
                body: Center(
                  child: ElevatedButton(
                    onPressed: () {
                      NativeBridge.getNativeData(++i);
                    },
                    child: const Text('Click me'),
                  ),
                ),
              );
            }
          }
        ```
        
    *   `MainActivity.kt`
        
        ```
          package com.example.bridge
        
          import io.flutter.embedding.android.FlutterActivity
          import io.flutter.embedding.engine.FlutterEngine
          import io.flutter.plugin.common.MethodChannel
        
          class MainActivity: FlutterActivity() {
              private val CHANNEL = "com.example/native"
        
              override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
                  super.configureFlutterEngine(flutterEngine)
                  MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
                      call, result ->
                      if (call.method == "getNativeData") {
                          if (!call.hasArgument("num")) {
                              result.error("MissingArgumentError", "You must provide num parameter", null)
                          }
                          val num: Int = call.argument<Int>("num")!!
                          val data = getNativeData(num)
                          result.success(data)
                      } else {
                          result.notImplemented()
                      }
                  }
              }
        
              private fun getNativeData(num: Int): String {
                  // Implement your native code logic here
                  return "From Native: $num"
              }
          }
        ```
        

Here, **we have successfully created a two-way communication channel between Flutter and Android**. When we click the on-screen button, we send integer data to Android and receive a different string each time (in the form of a log statement).

* * *

The complete project source code for the one-way and two-way communication codes is maintained commit-wise; you can view it by clicking [this](https://github.com/dubeyanant/native_bridge) link.

* * *

## **Thank you**

Did you reach the bottom? **_Thank you for reading!_**

Feel free to [connect with me](https://bio.link/aanant). 👋