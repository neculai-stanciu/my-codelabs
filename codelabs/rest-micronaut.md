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

## Todo

- Bean introspection
- Config and replace
- Validation 
- [Api versioning](https://docs.micronaut.io/1.2.6/guide/index.html#apiVersioning)
- [Serving static resources](https://docs.micronaut.io/1.2.6/guide/index.html#staticResources)
- [Error Handling](https://docs.micronaut.io/1.2.6/guide/index.html#errorHandling)
- [Reactive request processing](https://docs.micronaut.io/1.2.6/guide/index.html#reactiveServer)
- [Using project Lombok](https://docs.micronaut.io/1.2.6/guide/index.html#_using_project_lombok)