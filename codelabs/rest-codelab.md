<!-- Firstly we have to inform users what the document is about: -->
author: Stanciu Neculai
title: Representational state transfer
summary: Representational state transfer (REST) is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet. Mollit officia occaecat eiusmod cupidatat amet proident tempor duis laborum anim commodo cillum enim sint. Non voluptate ipsum occaecat sint dolore cillum veniam deserunt ad officia adipisicing sunt non laboris. Pariatur ea nostrud id velit.
id: rest
categories: web
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues

# Representational state transfer
Duration: 30:00

## What is REST
Duration: 25:00

Representational state transfer (REST) is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet. RESTful Web services allow the requesting systems to access and manipulate textual representations of Web resources by using a uniform and predefined set of stateless operations.

"Web resources" were first defined on the World Wide Web as documents or files identified by their URLs. However, today they have a much more generic and abstract definition that encompasses every thing or entity that can be identified, named, addressed, or handled, in any way whatsoever, on the Web. In a RESTful Web service, requests made to a resource's URI will elicit a response with a payload formatted in HTML, XML, JSON, or some other format. The response can confirm that some alteration has been made to the stored resource, and the response can provide hypertext links to other related resources or collections of resources. When HTTP is used, as is most common, the operations (HTTP methods) available are GET, HEAD, POST, PUT, PATCH, DELETE, CONNECT, OPTIONS and TRACE.

By using a stateless protocol and standard operations, RESTful systems aim for fast performance, reliability, and the ability to grow by reusing components that can be managed and updated without affecting the system as a whole, even while it is running.

The term representational state transfer was introduced and defined in 2000 by Roy Fielding in his doctoral dissertation. Fielding's dissertation explained the REST principles that were known as the "HTTP object model" beginning in 1994, and were used in designing the HTTP 1.1 and Uniform Resource Identifiers (URI) standards. The term is intended to evoke an image of how a well-designed Web application behaves: it is a network of Web resources (a virtual state-machine) where the user progresses through the application by selecting resource identifiers such as `http://www.example.com/articles/21` and resource operations such as GET or POST (application state transitions), resulting in the next resource's representation (the next application state) being transferred to the end user for their use.

Source: [Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer)

## Architectural properties
Duration: 20:00

The constraints of the REST architectural style affect the following architectural properties:

- performance in component interactions, which can be the dominant factor in user-perceived performance and network efficiency;
- simplicity of a uniform interface;
- modifiability of components to meet changing needs (even while the application is running);
- visibility of communication between components by service agents;
- portability of components by moving program code with the data;
- reliability in the resistance to failure at the system level in the presence of failures within components, connectors, or data.
- scalability allowing the support of large numbers of components and interactions among components. Roy Fielding describes REST's effect on scalability as follows:

Positive
: REST's client-server separation of concerns simplifies component implementation, reduces the complexity of connector semantics, improves the effectiveness of performance tuning, and increases the scalability of pure server components. Layered system constraints allow intermediaries—proxies, gateways, and firewalls—to be introduced at various points in the communication without changing the interfaces between components, thus allowing them to assist in communication translation or improve performance via large-scale, shared caching. REST enables intermediate processing by constraining messages to be self-descriptive: interaction is stateless between requests, standard methods and media types are used to indicate semantics and exchange information, and responses explicitly indicate cacheability.

Source: [Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer)

## Architectural constraints
Duration: 10:00

Six guiding constraints define a RESTful system. These constraints restrict the ways that the server can process and respond to client requests so that, by operating within these constraints, the system gains desirable non-functional properties, such as performance, scalability, simplicity, modifiability, visibility, portability, and reliability. If a system violates any of the required constraints, it cannot be considered RESTful.

The formal REST constraints are as follows:

- Client-Server Architecture
  The simple goal of this constraint is the separation of concerns between client and server.

- Stateless Communication
  This constraint improves scalability, visibility and reliability by simplifying the server implementation.

- Explicit Caching
  “An interesting observation is that the most efficient network request is one that doesn’t use the network.” — Fielding in his dissertation.
  I think it is pretty clear why caching is desirable.
- Layered System
  The layered system constraint aims to reduce complexity by encapsulating legacy services and introducing intermediary systems. Even though this is adding a bit of overhead, it can be offset by using caches in the REST architectural style.
- Uniform Interface
  This is really the main constraint distinguishing REST from other styles. A uniform interface means that client and server can evolve independently and components are decoupled. It is not this simple in reality though, as I will explain later.

- An optional constraint for Code-on-Demand can be used, but as it is optional I will not discuss it further.

Source: [Medium.com blog](https://medium.com/@andreasreiser94/why-hateoas-is-useless-and-what-that-means-for-rest-a65194471bc8)

## REST applied to Web services
Duration: 10:00

Web service APIs that adhere to the REST architectural constraints are called RESTful APIs. HTTP-based RESTful APIs are defined with the following aspects:

- a base URI, such as <http://api.example.com/collection/>
- standard HTTP methods (e.g., GET, POST, PUT, PATCH and DELETE);
- a media type that defines state transition data elements (e.g., Atom, microformats, application/vnd.collection+json, etc.). The current representation tells the client how to compose requests for transitions to all the next available application states. This could be as simple as a URI or as complex as a Java applet.

### Relationship between URI and HTTP methods

The following table shows how HTTP methods are typically used in a RESTful API.

| HTTP METHODS | Collection resource, such as <https://api.example.com/collection/>                                                                                                                                                   | Member resource, such as <https://api.example.com/collection/item3>                                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET          | Retrieve the URIs of the member resources of the collection resource in the response body.                                                                                                                           | Retrieve representation of the member resource in the response body.                                                                                                                                             |
| POST         | Create a member resource in the collection resource using the instructions in the request body. The URI of the created member resource is automatically assigned and returned in the response Location header field. | Create a member resource in the member resource using the instructions in the request body. The URI of the created member resource is automatically assigned and returned in the response Location header field. |
| PUT          | Replace all the representations of the member resources of the collection resource with the representation in the request body, or create the collection resource if it does not exist.                              | Replace all the representations of the member resource or create the member resource if it does not exist, with the representation in the request body.                                                          |
| PATCH        | Update all the representations of the member resources of the collection resource using the instructions in the request body, or may create the collection resource if it does not exist.                            | Update all the representations of the member resource, or may create the member resource if it does not exist, using the instructions in the request body.                                                       |
| DELETE       | Delete all the representations of the member resources of the collection resource.                                                                                                                                   | Delete all the representations of the member resource.                                                                                                                                                           |

The GET method is [safe](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Safe_methods), meaning that applying it to a resource does not result in a state change of the resource (read-only semantics). The GET, PUT and DELETE methods are [idempotent](https://en.wikipedia.org/wiki/Idempotent#Computer_science_meaning), meaning that applying them multiple times to a resource result in the same state change of the resource as applying them once, though the response might differ.
