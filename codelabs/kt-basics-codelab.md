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

## Install/Setup

* **Install kotlin on macos using brew**

```sh
  > brew install kotlin

  // test the installation
  > kotlin -version
  > kotlinc -version
```

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

  There are quite a few ways to create the kotlin application `bootstrap`.

* **Top level main method**

  File `App.kt`

```kotlin
  fun main(vararg args: String) {
    println("Hello Kotlin!")
  }
```

  *Compile and run the application*

```sh
  cd $prj_home/src/main/kotlin
  kotlinc ro/jtonic/handson/kotlin/basics/App.kt AppKt
  kotlin -classpath AppKt.jar ro.jtonic.handson.kotlin.basics.AppKt
```

  *See it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/fd1ac5fff2eefd1440e1450020294c4e65f016d2)*


* **Top level main (simplified)**

  File `App.kt`

```kotlin
  fun main() {
    println("Hello Kotlin!")
  }
```

  *Compile and run the application*

```sh
  cd $prj_home/src/main/kotlin
  kotlinc ro/jtonic/handson/kotlin/basics/App.kt AppKt
  kotlin -classpath AppKt.jar ro.jtonic.handson.kotlin.basics.AppKt
```

  *See it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/734dc7bd0d3e1cf53c64bee5c5d2714efab6e35c)*


* **The "java way" with companion object**

File `App.kt`

```kotlin
  class App {

    companion object {

      @JvmStatic
      fun main(vararg args: String) {
        println("Hello Kotlin!")
      }
    }
  }
```

  *Compile and run the application*

```sh
  cd $prj_home/src/main/kotlin
  kotlinc ro/jtonic/handson/kotlin/basics/App.kt AppKt
  kotlin -classpath AppKt.jar ro.jtonic.handson.kotlin.basics.AppKt
```

  *See it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/bd8668fc965ccbe06d1e90f22f39c29dd233b752)*

* **kotlin scripting**

  Create a `main.kts` script file outside the src folder (e.g. $prj_home/scripts/main.kts).

  File `main.kts`

```kotlin
  val message = "Hello Kotlin!"
  println("Hello Kotlin!")
```

  *Run the script*

```sh
  cd $prj_home/scripts
  kotlinc -script main.kts
```

  **Notes:**
  - Jetbrains works on an improved support for kotlin scripting.
  For additional details please consult [KEEP-75](https://github.com/Kotlin/KEEP/blob/master/proposals/scripting-support.md)
  - Kotlin community provides some useful tools which simplifies and extend the out-of-the-box scripting support.
  - For kotlin-based cli I recommend `micronaut` and `picocli`.

  *See it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/8bc8edc155aee03f3835d80eee38f26e565b0d1b)*


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

  > See it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/f6240e22b4d192ead921439ca43ded04fc6fb44c)

* **elvis operator** (`?:`)

```kotlin
  "test elvis operator" {

    var address: String? = null
    address ?: "unknown address" shouldBe "unknown address"

    address = "Kotlin Island"
    address shouldBe "Kotlin Island"

  }
```

  > See it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/afade3bcd15793ff398c2b39c4c288df8fd26cbf)

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
* **Not null assertion** (`!!`)

```kotlin

    "test not null assertion" {

      fun length(s: String?): Int {
        val notNullString: String = s!! //Kotlin.KotlinNullPointerException
        return notNullString.length
      }

      length("jtonic") shouldBe 6

      shouldThrow<NullPointerException> {
        length(null)
      }

      shouldThrow<KotlinNullPointerException> {
        length(null)
      }

    }
```

  **Notes:**
  - throws `KotlinNullPointerException` which extends `java.lang.NullPointerException`
  - it is thrown at assignment site
  - it should be avoided in application written entirely in kotlin. It is used when calling java API from kotlin

  > See it on [github](https://github.com/jtonic/tony_software_development_cookbook/commit/4f88d00e359ce3573051aa68bce14e2999992d99)

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
