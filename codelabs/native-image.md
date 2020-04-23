author: Stanciu Neculai
title: Generate a Micronaut app's Native Image with GraalVM
summary: A step by step tutorial for native-image generation for a Micronaut web application
id: native-image
categories: web
environments: Java
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues

# Generate a Micronaut app's Native Image with GraalVM

## Add Micronaut dependencies for graal

Add the following dependency:

```xml
<dependency>
      <groupId>org.graalvm.nativeimage</groupId>
      <artifactId>svm</artifactId>
      <scope>provided</scope>
</dependency>
```

And then add the following annotation processor lib:

```xml
<annotationProcessorPaths>
    ...
    <path>
        <groupId>io.micronaut</groupId>
        <artifactId>micronaut-graal</artifactId>
        <version>2.0.0.M2</version>
    </path>
</annotationProcessorPaths>
```

To simplify building the image you need to create a **native-image.properties** file. The convention is to use the folder **src/main/resources/META-INF/native-image** and then a folder following the maven coordinates of the application.

Content of properties file is: 

```txt
Args = -H:IncludeResources=logback.xml|application.yml|.*/*.vm \
       -H:Name=surveysapi \
       -H:Class=com.ing.Application

```

## Install GraalVM and native image

I will use sdkman to install on my Mac:

```bash
$ sdk install java  20.0.0.r11-grl
```

For more details please check [GraalVM getting started guide](https://www.graalvm.org/docs/getting-started/)

Then we need to install **native-image** tool using the following command: 

```bash
gu install native-image
```

## Build and run native image

First step is to create a package with the application using:

```bash
$ mvn clean install
```

### Create native image with docker

Create a Dockerfile with the following content: 

```Dockerfile
#FROM oracle/graalvm-ce:20.0.0-java8 as graalvm
# For JDK 11
FROM oracle/graalvm-ce:20.0.0-java11 as graalvm
RUN gu install native-image

COPY . /home/app/surveysapi
WORKDIR /home/app/surveysapi

RUN native-image --no-server -cp ./target/surveys-api*.jar

FROM frolvlad/alpine-glibc
RUN apk update && apk add libstdc++
EXPOSE 8080
COPY --from=graalvm /home/app/surveysapi/surveysapi /app/surveysapi
ENTRYPOINT ["/app/surveysapi"]
```

And then add the following script `build-docker.sh`:

```bash
#!/bin/sh
docker build ../ --file ./Dockerfile -t surveysapi
echo
echo
echo "To run the docker container execute:"
echo "    $ docker run -p 8080:8080 surveysapi"
```

Make script executable and run using `./build-docker.sh`
Then run generate image:

```bash
$ docker run -p 8080:8080 surveysapi
/app/surveysapi: /usr/lib/libstdc++.so.6: no version information available (required by /app/surveysapi)
11:11:21.908 [main] INFO  io.micronaut.runtime.Micronaut - Startup completed in 34ms. Server Running: http://e0903c2812fb:8080

```

### Create native image without docker

To start building a native image the you need to run the following command:

```bash
$ native-image --no-server -cp surveys-api-0.1.jar
```

Run native image:

```bash
$ ./surveysapi 
13:37:06.911 [main] INFO  io.micronaut.runtime.Micronaut - Startup completed in 61ms. Server Running: http://localhost:8080

```
