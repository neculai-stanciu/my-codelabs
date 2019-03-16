<!-- Read more here: https://medium.com/@mariopce/tutorial-how-to-make-tutorials-using-google-code-labs-gangdam-style-d62b35476816 -->

<!-- Firstly we have to inform users what the document is about: -->
author: Stanciu Neculai
summary: Javscript guide
id: js-01
categories: web
environments: js
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues
analytics account: 0

<!-- 
To specify the title of tutorial just use one “#” like below: 
 -->

Javscript step by step guide

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
## Strict mode
Duration: 5:00
## *this* keyword
Duration: 20:00
## *let* and *const*
Duration: 10:00
## Debugging
Duration: 5:00
## Best Prctices
Duration: 20:00
## Versions
Duration: 20:00
## Overview
Duration: 10:00
