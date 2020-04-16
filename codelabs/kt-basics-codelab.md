author: Antonel-Ernest Pazargic
title: JavaScript basics
id: kt-basics
categories: jvm
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues

# Kotlin basics

## Agenda

* **History**

* **Kotlin strengths**

* **Kotlin outstanding features**

* **OOP in kotlin**

* **Design patterns in kotlin**

* **Example (kotlin http client)**

* **What’s next?**

## History

Kotlin was started by **Jetbrains** in 2010

It went GA on **February 15, 2016**

**Google IO 2017** - Google announced  Kotlin as an official programming language for Android development

**Google IO 2019** - Kotlin-first (many new APIs and features will be offered first in Kotlin)

## Kotlin strengths

* It is concise, expressive, **toolable**, **interoperable** and pragmatic

* It’s a statically typed programming language

* Inspired by
  * **Scala** (case classes, pattern match)
  * **C#** (extension methods, properties, with and using constructs)
  * **Groovy** (default ‘it’ parameter in lambda expressions)
  * **Swift** (down-casting, subclassing and implementation)
  * **Haskell** (ranges)

* Compile to bytecode and run on **JVM / Android** (compatible with Java 6)

* Can compile to **javascript source code**

* Can be used as **scripting language** (kts extension- Gradle/Kotlin)

* Compiles directly to machine code (**Kotlin/Native**) – in Tech Preview

## Kotlin outstanding features

* **Null safety**

  * **Not null versus nullable types**

    ```kotlin
      fun print(msg: String?) {}

      fun printPage(msg: String) {}

      print("Hello kotlin")
      print(null)
      printPage(null) // compilation error.
    ```

  * **safe call operator** `?.`

  ```kotlin
    "test safe call operator" {
      data class User(val name: String, val address: String)

      var user: User? = null
      user?.address shouldBe null

      user = User("Tony", "Mihai Bravu")
      user?.address shouldBe "Mihai Bravu"
    }
  ```

  * **elvis operator** `?:`

  ```kotlin
    "test elvis operator" {
      var address: String? = null
      address ?: "unknown address" shouldBe "unknown address"

      address = "Kotlin Island"
      address shouldBe "Kotlin Island"
    }
  ```

## Micronaut http client in kotlin

This will be moved in a separate codelab!!!

## What’s next?

**Options**

  1. Functional programming in kotlin
  2. Kotlin Reactive programming
  3. Micronaut and Kotlin
  4. Kotlin 1.4
