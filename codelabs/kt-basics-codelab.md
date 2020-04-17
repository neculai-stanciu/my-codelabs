author: Antonel-Ernest Pazargic
title: JavaScript basics
id: kt-basics
categories: jvm
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues

# Kotlin basics

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

## Setup

* **Gradle**

  File `build.gradle`

```groovy
  plugins {
      id 'org.jetbrains.kotlin.jvm' version '1.3.72'
  }
  dependencies {
      implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk8"
  }
```

* **Kotlin DSL for Gradle**

  File `build.gradle.kts`

```kotlin
  plugins {
    kotlin("jvm") version "1.3.72"
  }
  dependencies {
    implementation(kotlin("stdlib-jdk8"))
  }
```

  See further details about kotlin gradle setup [here](https://kotlinlang.org/docs/reference/using-gradle.html)

* **Maven**

  File `pom.xml`

```xml
  <dependencies>
      <dependency>
          <groupId>org.jetbrains.kotlin</groupId>
          <artifactId>kotlin-stdlib-jdk8</artifactId>
          <version>1.3.72</version>
      </dependency>
  </dependencies>

  <build>
    <sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
    <testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>
    <plugins>
      <plugin>
          <groupId>org.jetbrains.kotlin</groupId>
          <artifactId>kotlin-maven-plugin</artifactId>
          <version>${kotlin.version}</version>

          <executions>
              <execution>
                  <id>compile</id>
                  <goals> <goal>compile</goal> </goals>
              </execution>

              <execution>
                  <id>test-compile</id>
                  <goals> <goal>test-compile</goal> </goals>
              </execution>
          </executions>
      </plugin>
  </plugins>
```
  See further details about kotlin maven setup [here](https://kotlinlang.org/docs/reference/using-maven.html)

  **Notes:**
  - Kotlin can be use with ant build tool. See how [here](https://kotlinlang.org/docs/reference/using-ant.html)

## **"Hello Kotlin world!"**

  tbd

  - top level main
  - top level main simplified (w/o vararg...)
  - "the java way" with companion object
  - kt script file (notes: KEEP, Micronaut)

## Kotlin main features

### **Null safety**
---

* **Not null versus nullable types** (`T and T?`)

```kotlin
  fun print(msg: String?) {}
  fun printPage(msg: String) {}

  print("Hello kotlin")
  print(null)
  printPage(null) // compilation error
```

* **safe call operator** (`?.`)

```kotlin
  "test safe call operator" {
    data class User(val name: String, val address: String)

    var user: User? = null
    user?.address shouldBe null

    user = User("Tony", "Mihai Bravu")
    user?.address shouldBe "Mihai Bravu"
  }
```

  > Show it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/f6240e22b4d192ead921439ca43ded04fc6fb44c)

* **elvis operator** (`?:`)

```kotlin
  "test elvis operator" {

    var address: String? = null
    address ?: "unknown address" shouldBe "unknown address"

    address = "Kotlin Island"
    address shouldBe "Kotlin Island"

  }
```

  > Show it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/afade3bcd15793ff398c2b39c4c288df8fd26cbf)

* **safe cast operator** (`as?`)

```kotlin
  "test safe cast operator" {

      val jtonic = User("jtonic", "Mihai Bravu") as Any
      val tony = Person("Tony", 18) as Any

      (jtonic as? User) shouldNotBe null
      (tony as? User) shouldBe null

      val jtonicUserAddress = (jtonic as? User)?.address
      val tonyUserAddress = (tony as? User)?.address

      jtonicUserAddress shouldBe "Mihai Bravu"
      tonyUserAddress shouldBe null

  }
```

  > Show it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/79fdd2c0c9f19f1b47c5138fa77bdd839185c3a7)

## Kotlin plugins for IntelliJ Idea

  TBD
  - convert from java to kotlin
  - decompile
  - kotlin scratch file
  - kotlin REPL
  - kotlin worksheet

## OOP in Kotlin

  What to do next:
  - val, var
  - fun
  - const val
  - data class
  - primary constructor
  - inheritance, implementation
  - custom getters/setters
  - primary and secondary constructors
  - singleton with object
  - companion object
  - delegation (by)
  - generics (reified)
  - aliases
  - inline classes
  - kotlin type hierarchy

This will be moved in a separate codelab!!!

## What’s next?

**Options**

  1. Design patterns in kotlin
  2. Kotlin collections
  3. Scripting in kotlin (cli)
  4. Functional programming in kotlin
  5. Reactive programming in kotlin
  6. Kotlin coroutines
  7. Kotlin 1.4
  8. Micronaut and Kotlin
  9. Kotlin JS
  10. Kotlin Multi Platform Programming
  11. Kotlin DSL
  12. SpringBoot and Kotlin
