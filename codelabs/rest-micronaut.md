<!-- Firstly we have to inform users what the document is about: -->
author: Stanciu Neculai
title: Representational state transfer
summary: A step by step tutorial for a REST api using Micronaut framework.
id: rest-micronaut
categories: web
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues

# REST api using micronaut
Duration: 30:00

## Generate app using Micronaut cli
Duration: 25:00

If you need to configure Micronaut cli please check [this guide](/my-codelabs/setup-micronaut)

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

Add swagger info in **application.yml**

```yml
  router:
        static-resources:
            swagger:
                paths: classpath:META-INF/swagger
                mapping: /swagger/**
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
                    ...
                </compilerArgs>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## Add first controller

