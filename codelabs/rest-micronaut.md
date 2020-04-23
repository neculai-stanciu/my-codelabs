author: Stanciu Neculai
title: Micronaut REST api implementation
summary: A step by step tutorial for a REST api using Micronaut framework.
id: rest-micronaut
categories: web
environments: Java
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues

# Micronaut REST api implementation

## Generate app using Micronaut cli
Duration: 5:00

If you need to configure Micronaut cli please check [this guide](/my-codelabs/codelabs/setup-micronaut)

We will use **maven** as build tool and open-api integration. For this we need to run the following command:

```bash
$ mn create-app com.ing.surveys-api --build maven --features swagger-java
| Generating Java project...
| Application created at /Users/rh69ua/Developer/stretch-ambitions/surveys-api
localhost:stretch-ambitions rh69ua$
```
After running mn the structure should look:

```bash
$ tree
.
├── Dockerfile
├── micronaut-cli.yml
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── ing
    │   │           └── Application.java
    │   └── resources
    │       ├── application.yml
    │       └── logback.xml
    └── test
        └── java
            └── com
                └── ing
```

Then we should do:

```bash
$ mvn clean install
```

And then run the app:

```bash
$ mvn exec:exec
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building surveys-api 0.1
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- exec-maven-plugin:1.6.0:exec (default-cli) @ surveys-api ---
20:15:31.080 [main] INFO  io.micronaut.runtime.Micronaut - Startup completed in 622ms. Server Running: http://localhost:8080
```

## Add OpenAPIDefinition
Duration: 10:00

Add swagger info in **application.yml**

```yml
  router:
    static-resources:
      swagger:
        paths: classpath:META-INF/swagger
        mapping: /swagger/**
      swagger-ui:
        paths: classpath:META-INF/swagger/views/swagger-ui
        mapping: /swagger-ui/**
        enabled: true
        theme: MATERIAL
```

Compile and start api again an you should be able to get:

```bash
$ curl http://localhost:8080/swagger/surveys-api-0.0.yml
openapi: 3.0.1
info:
  title: surveys-api
  version: "0.0"
```

### Generating OpenAPI Views

By default the generation of views is disabled. To turn it on you have to set the following system property micronaut.openapi.views.spec. The string syntax is a series of comma-separated key-value pairs, to enable and configure the views.

```bash
micronaut.openapi.views.spec=redoc.enabled=true,rapidoc.enabled=true,swagger-ui.enabled=true,swagger-ui.theme=flattop
```

In order to configure maven with this property you should add:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <fork>true</fork>
                <compilerArgs>
                    <arg>-J-Dmicronaut.openapi.views.spec=rapidoc.enabled=true,swagger-ui.enabled=true,swagger-ui.theme=flattop</arg>
                </compilerArgs>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## Add first controller
Duration: 10:00

In order to create a service that responds to "Hello World" you first need a controller. The following is an example of a controller:

```java
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller("/hello") //#1
public class HelloController {

    @Get(produces = MediaType.TEXT_PLAIN) //#2
    public String index() {
        return "Hello World"; //#3
    }
}
```

1. The class is defined as a controller with the @Controller annotation mapped to the path /hello
2. The @Get annotation is used to map the index method to all requests that use an HTTP GET
3. A String "Hello World" is returned as the result

Negative
: In case you want to add lombok support please make sure that **lombok** dependency is first in **annotationProcessorPaths** like:

```xml
<path>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.12</version>
 </path>
```

## Bean Introspection

Since Micronaut 1.1, a compilation time replacement for the JDK’s [Introspector](https://docs.oracle.com/javase/8/docs/api/java/beans/Introspector.html) class has been included.

The [BeanIntrospector](https://docs.micronaut.io/latest/api/io/micronaut/core/beans/BeanIntrospector.html) and [BeanIntrospection](https://docs.micronaut.io/latest/api/io/micronaut/core/beans/BeanIntrospection.html) interfaces allow looking up bean introspections that allow you to instantiate and read/write bean properties without using reflection or caching reflective metadata which consumes excessive memory for large beans.
Making a Bean Available for Introspection

### Use the @Introspected Annotation

The [@Introspected](https://docs.micronaut.io/latest/api/io/micronaut/core/annotation/Introspected.html) annotation can be used on any class which you want to make available for introspection, simply annotate the class with [@Introspected](https://docs.micronaut.io/latest/api/io/micronaut/core/annotation/Introspected.html):

```java
import io.micronaut.core.annotation.Introspected;

@Introspected
public class Person {

    private String name;
    private int age = 18;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

## Http routing

### URI Paths

The value of the **@Controller** annotation is a [RFC-6570 URI template](https://tools.ietf.org/html/rfc6570) you can therefore embed URI variables within the path using the syntax defined by the URI template specification.

Positive
: Many other frameworks, including Spring, implement the URI template specification

### URI template example

```java
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;

@Controller("/issues")
public class IssuesController {

    @Get("/{number}")
    public String issue(@PathVariable Integer number) {
        return "Issue # " + number + "!";
    }
}
```

Positive
: Note that the URI template in the previous example requires that the number variable is specified. You can specify optional URI templates with the syntax: /issues{/number} and by annotating the number parameter with **@Nullable**.

### More routing examples

| Template               | Description                         | Matching URI            |
| ---------------------- | ----------------------------------- | ----------------------- |
| /books/{id}            | Simple match                        | /books/1                |
| /books/{id:2}          | A variable of 2 characters max      | /books/10               |
| /books{/id}            | An optional URI variable            | /books/10 or /books     |
| /book{/id:[a-zA-Z]+}   | An optional URI variable with regex | /books/foo              |
| /books{?max,offset}    | Optional query parameters           | /books?max=10&offset=10 |
| /books{/path:.*}{.ext} | Regex path match with extension     | /books/foo/bar.xml      |

## [Error Handling](https://docs.micronaut.io/latest/guide/index.html#errorHandling)

Sometimes with distributed applications, bad things happen. Having a good way to handle errors is important.

The [Error](https://docs.micronaut.io/latest/api/io/micronaut/http/annotation/Error.html) annotation supports defining either an exception class or an HTTP status. Methods decorated with the annotation will be invoked as the result of other controller methods. The annotation also supports the notion of global and local, local being the default.

Local error handlers will only respond to methods defined in the same controller. Global error handlers can respond to any method in any controller. A local error handler is always searched for first when resolving which handler to execute.

```java
  @Error(exception = ConstraintViolationException.class)
  public Map<String, Object> onSavedFailed(HttpRequest request, ConstraintViolationException ex) {
    final Map<String, Object> model = new HashMap<>();
    model.put("errors", messageSource.violationsMessages(ex.getConstraintViolations()));
    return model;
  }
```

You can check a full example in [surveys-api here](https://github.com/neculai-stanciu/micronaut-sessions/blob/5f0471a9de487991a365cbfced9ac9ce8312efda/surveys-api/src/main/java/com/nstanciu/tutorials/mn/surveys/resource/SurveyResource.java#L59)

### Global error handler

```java
  @Error(global = true)
  public HttpResponse<JsonError> error(HttpRequest request, Throwable e) {
    JsonError error = new JsonError("Bad Things Happened: " + e.getMessage())
        .link(Link.SELF, Link.of(request.getUri()));

    return HttpResponse.<JsonError>serverError()
        .body(error);
  }
```

You can check a full example in [surveys-api here](https://github.com/neculai-stanciu/micronaut-sessions/blob/5f0471a9de487991a365cbfced9ac9ce8312efda/surveys-api/src/main/java/com/nstanciu/tutorials/mn/surveys/error/JsonParseErrorHandler.java#L13)

### ExceptionHandler

Additionally you can implement a [ExceptionHandler](https://docs.micronaut.io/latest/api/io/micronaut/http/server/exceptions/ExceptionHandler.html); a generic hook for handling exceptions that occurs during the execution of an HTTP request.

Imagine your app throws an NotFoundException the requested resource is not available:
You can implement an exception handler:

```java
@Produces
@Singleton
@Requires(classes = {NotFoundException.class, ExceptionHandler.class})
public class NotFoundExceptionHandler implements ExceptionHandler<NotFoundException, HttpResponse> {

    @Override
    public HttpResponse handle(HttpRequest request, NotFoundException exception) {
        return HttpResponse.ok(0);
    }
}
```

Negative
: An **@Error** annotation capturing an exception has precedence over an implementation of **ExceptionHandler** capturing the same exception.


## [Api versioning](https://docs.micronaut.io/latest/guide/index.html#apiVersioning)

Since 1.1.x, Micronaut supports API versioning via a dedicated @Version annotation.

The following example demonstrates how to version an API:

```java
import io.micronaut.core.version.annotation.Version;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller("/versioned")
class VersionedController {

    @Version("1") 
    @Get("/hello")
    String helloV1() {
        return "helloV1";
    }

    @Version("2") 
    @Get("/hello")
    String helloV2() {
        return "helloV2";
    }
```

You should then enabling versioning by setting `micronaut.router.versioning.enabled` to `true` in application.yml:

```yml
micronaut:
    router:
        versioning:
            enabled: true
```

By default Micronaut has 2 out-of-the-box strategies for resolving the version that are based on an HTTP header named `X-API-VERSION` or a request parameter named `api-version`, however this is configurable. A full configuration example can be seen below:

```yml
micronaut:
    router:
        versioning:
            enabled: true
            parameter:
                enabled: false
                names: 'v,api-version'
            header:
                enabled: true
                names:
                    - 'X-API-VERSION'
                    - 'Accept-Version
```

### Default Version

It is possible to supply a default version through configuration.

```yml
micronaut:
    router:
        versioning:
            enabled: true
            default-version: 3
```

A route will **not** be matched if the following conditions are met:

- The default version is configured
- No version is found in the request
- The route defines a version
- The route version does not match the default version

If the incoming request specifies a version then the default version has no effect.

## Api example

You can check example of an REST api with Micronaut [here](https://github.com/neculai-stanciu/micronaut-sessions/tree/master/surveys-api)
<!-- ## [Reactive request processing](https://docs.micronaut.io/latest/guide/index.html#reactiveServer) -->
