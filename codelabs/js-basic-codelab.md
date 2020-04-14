author: Stanciu Neculai
title: JavaScript basics
summary: Javscript basic codelabs
id: js-basic
categories: web
environments: js
url: my-codelabs/js-basic
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues

# Javscript basic

<!--
To specify the title of the first step, use two chars “##” right after title provide information about how much time user should spend on that part.
 -->

## Overview of the tutorial

In this course you will learn about:

1. Function Scope
1. Hoisting
1. Strict mode
1. Prototype
1. `this` keyword
1. `let` and `const`
1. Debugging
1. Best Prctices
1. Versions

## Function Scope
Duration: 10:00

In JavaScript there are two types of scope:

* Local scope
* Global scope

JavaScript has function scope: Each function creates a new scope.
Scope determines the accessibility (visibility) of these variables.\Variables defined inside a function are not accessible (visible) from outside the function.

### Local JavaScript Variables

Variables declared within a JavaScript function, become **LOCAL** to the function.
Local variables have **Function scope**: They can only be accessed from within the function.

```js
// code here can NOT use carName

function myFunction() {
  var carName = "Volvo";

  // code here CAN use carName
}
```
Since local variables are only recognized inside their functions, variables with the same name can be used in different functions.

Local variables are created when a function starts, and deleted when the function is completed.

### Global JavaScript Variables

A variable declared outside a function, becomes **GLOBAL**.
A global variable has **global scope**: All scripts and functions on a web page can access it.

```js
var carName = "Volvo";

// code here can use carName

function myFunction() {

  // code here can also use carName
}
```
### JavaScript Variables
In JavaScript, objects and functions are also variables.

Positive
: Scope determines the accessibility of variables, objects, and functions from different parts of the code.

### Automatically Global

If you assign a value to a variable that has not been declared, it will automatically become a **GLOBAL** variable.
This code example will declare a global variable `carName`, even if the value is assigned inside a function.

```js
myFunction();

// code here can use carName

function myFunction() {
  carName = "Volvo";
}
```

### Global Variables in HTML

With JavaScript, the global scope is the complete JavaScript environment.

In HTML, the global scope is the window object. All global variables belong to the window object.

```js
var carName = "Volvo";

// code here can use window.carName
```

Negative
:Do NOT create global variables unless you intend to.
Your global variables (or functions) can overwrite window variables (or functions).
Any function, including the window object, can overwrite your global variables and functions.


## Hoisting
Duration: 10:00

Hoisting is JavaScript's default behavior of moving declarations to the top.

### JavaScript Declarations are Hoisted

In JavaScript, a variable can be declared after it has been used.
In other words; a variable can be used before it has been declared.
**Example 1** gives the same result as **Example 2**:

```js
// Example 1
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x
```

```js
// Example 2
var x; // Declare x
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element
```

To understand this, you have to understand the term "hoisting".
Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function).

### The let and const Keywords

Positive
: Variables and constants declared with let or const are not hoisted!

Positive
: Read more about let and const in [JS Let / Const](https://www.w3schools.com/Js/js_let.asp).


## Strict mode
Duration: 5:00

`use strict;` Defines that JavaScript code should be executed in "strict mode".

### The "use strict" Directive
The "use strict" directive was new in ECMAScript version 5.

It is not a statement, but a literal expression, ignored by earlier versions of JavaScript.

The purpose of "use strict" is to indicate that the code should be executed in "strict mode".

With strict mode, you can not, for example, use undeclared variables.

### Declaring Strict Mode

Strict mode is declared by adding `use strict;` to the beginning of a script or a function.

Declared at the beginning of a script, it has global scope (all code in the script will execute in strict mode):

```js
"use strict";
x = 3.14;       // This will cause an error because x is not declared
```

```js
"use strict";
myFunction();

function myFunction() {
  y = 3.14;   // This will also cause an error because y is not declared
}
```

Declared inside a function, it has local scope (only the code inside the function is in strict mode):

```js
x = 3.14;       // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14;   // This will cause an error
}
```
### The "use strict"; Syntax

The syntax, for declaring strict mode, was designed to be compatible with older versions of JavaScript.

Compiling a numeric literal (4 + 5;) or a string literal ("John Doe";) in a JavaScript program has no side effects. It simply compiles to a non existing variable and dies.

So `use strict` only matters to new compilers that "understand" the meaning of it.

### Why Strict Mode?

Strict mode makes it easier to write "secure" JavaScript.

Strict mode changes previously accepted "bad syntax" into real errors.

As an example, in normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable.

In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties.

In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.

## this keyword
Duration: 30:00

```js
var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```
### What is **this**?

The JavaScript **this** keyword refers to the object it belongs to.

Positive
: It has different values depending on where it is used:
  * In a method, this refers to the owner object.
  * Alone, this refers to the global object.
  * In a function, this refers to the global object.
  * In a function, in strict mode, this is undefined.
  * In an event, this refers to the element that received the event.
  * Methods like call(), and apply() can refer this to any object.

### **this** in a Method

In an object method, `this` refers to the "**owner**" of the method.

In the example on the top of this page, this refers to the **person** object.

The **person** object is the **owner** of the **fullName** method.

```js
fullName : function() {
  return this.firstName + " " + this.lastName;
}
```

### **this** alone

When used alone, the **owner** is the Global object, so `this` refers to the Global object.
In a browser window the Global object is `[object Window]`:

```js
  var x = this;
```

In **strict mode**, when used alone, `this` also refers to the Global object `[object Window]`:

```js
"use strict";
var x = this;
```

### **this** in a Function (Default)
In a JavaScript function, the owner of the function is the **default** binding for `this`.
So, in a function, `this` refers to the Global object `[object Window]`.

```js
function myFunction() {
  return this;
}
```

### **this** in a Function (Strict)

JavaScript **strict mode** does not allow default binding.
So, when used in a function, in strict mode, `this` is `undefined`.

```js
"use strict";
function myFunction() {
  return this;
}
```

### **this** in Event Handlers

In HTML event handlers, `this` refers to the HTML element that received the event:

```html
<button onclick="this.style.display='none'">
  Click to Remove Me!
</button>
```

### Object Method Binding

In these examples, `this` is the person object (The person object is the "owner" of the function):

```js
var person = {
  firstName  : "John",
  lastName   : "Doe",
  id         : 5566,
  myFunction : function() {
    return this;
  }
};
```

```js
var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```
In other words: **this.firstName** means the **firstName** property of **this** (person) object.

### Explicit Function Binding

The `call()` and `apply()` methods are predefined JavaScript methods.

They can both be used to call an object method with another object as argument.

In the example below, when calling person1.fullName with person2 as argument, this will refer to person2, even if it is a method of person1:

```js
 var person1 = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
var person2 = {
  firstName:"John",
  lastName: "Doe",
}
person1.fullName.call(person2);  // Will return "John Doe"
```

## let and const
Duration: 10:00

### ECMAScript 2015

ES2015 introduced two important new JavaScript keywords: `let` and `const`.

These two keywords provide **Block Scope** variables (and constants) in JavaScript.

Before ES2015, JavaScript had only two types of scope: **Global Scope** and **Function Scope**.

### Global Scope

Variables declared **Globally** (outside any function) have **Global Scope**.

```js
var carName = "Volvo";

// code here can use carName

function myFunction() {
  // code here can also use carName
}
```
**Global** variables can be accessed from anywhere in a JavaScript program.

### Function Scope

Variables declared **Locally** (inside a function) have **Function Scope**.

```js
// code here can NOT use carName

function myFunction() {
  var carName = "Volvo";
  // code here CAN use carName
}

// code here can NOT use carName
```
**Local** variables can only be accessed from inside the function where they are declared.

### JavaScript Block Scope

Variables declared with the `var` keyword can not have **Block Scope**.

Variables declared inside a block `{}` can be accessed from outside the block.

```js
{
  var x = 2;
}
// x CAN be used here
```
Before ES2015 JavaScript did not have **Block Scope**.
Variables declared with the `let` keyword can have Block Scope.
Variables declared inside a block `{}` can not be accessed from outside the block:

```js
{
  let x = 2;
}
// x can NOT be used here
```

Declaring a variable with `const` is similar to `let` when it comes to **Block Scope**.

The x declared in the block, in this example, is not the same as the x declared outside the block:

```js
 var x = 10;
// Here x is 10
{
  const x = 2;
  // Here x is 2
}
// Here x is 10
```
### Not Real Constants

The keyword `const` is a little misleading.
It does NOT define a constant value. It defines a constant reference to a value.
Because of this, we cannot change constant primitive values, but we can change the properties of constant objects.

### Hoisting

Variables defined with `const` or `let` are not hoisted to the top.
A `const` variable cannot be used before it is declared:

```js
carName = "Volvo";    // You can NOT use carName here
const carName = "Volvo";
```

Using a `let` variable before it is declared will result in a `ReferenceError`.
The variable is in a "temporal dead zone" from the start of the block until it is declared:

```js
// you can NOT use carName here
let carName;
```

## Debugging
Duration: 5:00

Positive
: Errors can (will) happen, every time you write some new computer code.

### JavaScript Debuggers

Debugging is not easy. But fortunately, all modern browsers have a built-in JavaScript debugger.

Built-in debuggers can be turned on and off, forcing errors to be reported to the user.

With a debugger, you can also set breakpoints (places where code execution can be stopped), and examine variables while the code is executing.

Normally, otherwise follow the steps at the bottom of this page, you activate debugging in your browser with the F12 key, and select "Console" in the debugger menu.

### The console.log() Method

If your browser supports debugging, you can use `console.log()` to display JavaScript values in the debugger window:

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Web Page</h1>

<script>
a = 5;
b = 6;
c = a + b;
console.log(c);
</script>

</body>
</html>
```

## Best Prctices
Duration: 20:00
## Versions
Duration: 20:00
## Overview
Duration: 10:00
