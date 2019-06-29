<!-- Firstly we have to inform users what the document is about: -->
author: Stanciu Neculai
title: JS modules
summary: A simple introduction to JS modules
id: js-modules
categories: web
environments: js
status: draft
feedback link: https://github.com/neculai-stanciu/my-codelabs/issues
analytics account: 0

# JS modules
Duration: 30:00

## Module systems for current JavaScript 

JavaScript does not have built-in support for modules, but the community has created impressive work-arounds. The two most important (and unfortunately incompatible) standards are:

- CommonJS Modules: The dominant implementation of this standard is in Node.js (Node.js modules have a few features that go beyond CommonJS). Characteristics:

    - Compact syntax
    - Designed for synchronous loading
    - Main use: server

- Asynchronous Module Definition (AMD): The most popular implementation of this standard is RequireJS. Characteristics: 

    - Slightly more complicated syntax, enabling AMD to work without eval() (or a compilation step).
    - Designed for asynchronous loading
    - Main use: browser

## ECMAScript 6 modules

The goal for ECMAScript 6 modules was to create a format that both users of CommonJS and of AMD are happy with:

- Similar to CommonJS, they have a compact syntax, a preference for single exports and support for cyclic dependencies.
- Similar to AMD, they have direct support for asynchronous loading and configurable module loading.

Being built into the language allows ES6 modules to go beyond CommonJS and AMD (details are explained later):

- Their syntax is even more compact than CommonJS’s.
- Their structure can be statically analyzed (for static checking, optimization, etc.).
- Their support for cyclic dependencies is better than CommonJS’s.

The ES6 module standard has two parts:

- Declarative syntax (for importing and exporting)
- Programmatic loader API: to configure how modules are loaded and to conditionally load modules

## An overview of the ES6 module syntax

There are two kinds of exports: named exports (several per module) and default exports (one per module).

### Named exports (several per module)

A module can export multiple things by prefixing their declarations with the keyword export. These exports are distinguished by their names and are called named exports.

```js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

There are other ways to specify named exports (which are explained later), but I find this one quite convenient: simply write your code as if there were no outside world, then label everything that you want to export with a keyword.

If you want to, you can also import the whole module and refer to its named exports via property notation:

```js
//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5
```

**The same code in CommonJS syntax**: 

```js
//------ lib.js ------
var sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}
module.exports = {
    sqrt: sqrt,
    square: square,
    diag: diag,
};

//------ main.js ------
var square = require('lib').square;
var diag = require('lib').diag;
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

### Default exports (one per module) 

Modules that only export single values are very popular in the Node.js community. But they are also common in frontend development where you often have constructors/classes for models, with one model per module. An ECMAScript 6 module can pick a default export, the most important exported value. Default exports are especially easy to import.

The following ECMAScript 6 module “is” a single function:

```js
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();
```

An ECMAScript 6 module whose default export is a class looks as follows:

```js
//------ MyClass.js ------
export default class { ... };

//------ main2.js ------
import MyClass from 'MyClass';
let inst = new MyClass();
```
> The operand of the default export declaration is an expression, it often does not have a name. Instead, it is to be identified via its module’s name.

### Having both named exports and a default export in a module

The following pattern is surprisingly common in JavaScript: A library is a single function, but additional services are provided via properties of that function. Examples include jQuery and Underscore.js. The following is a sketch of Underscore as a CommonJS module:

```js
//------ underscore.js ------
var _ = function (obj) {
    ...
};
var each = _.each = _.forEach =
    function (obj, iterator, context) {
        ...
    };
module.exports = _;

//------ main.js ------
var _ = require('underscore');
var each = _.each;
...
```

With ES6 glasses, the function _ is the default export, while each and forEach are named exports. As it turns out, you can actually have named exports and a default export at the same time. As an example, the previous CommonJS module, rewritten as an ES6 module, looks like this:

```js
//------ underscore.js ------
export default function (obj) {
    ...
};
export function each(obj, iterator, context) {
    ...
}
export { each as forEach };

//------ main.js ------
import _, { each } from 'underscore';
...
```
> Note that the CommonJS version and the ECMAScript 6 version are only roughly similar. The latter has a flat structure, whereas the former is nested. Which style you prefer is a matter of taste, but the flat style has the advantage of being statically analyzable (why that is good is explained below). The CommonJS style seems partially motivated by the need for objects as namespaces, a need that can often be fulfilled via ES6 modules and named exports.

#### The default export is just another named export  

The default export is actually just a named export with the special name default. That is, the following two statements are equivalent:

```js
import { default as foo } from 'lib';
import foo from 'lib';
```

Similarly, the following two modules have the same default export:

```js 
//------ module1.js ------
export default 123;

//------ module2.js ------
const D = 123;
export { D as default };
```

#### Why do we need named exports?  

You may be wondering – why do we need named exports if we could simply default-export objects (like CommonJS)? The answer is that you can’t enforce a static structure via objects and lose all of the associated advantages (described in the next section).


## Design goals  

Positive
: You can read here [here](http://2ality.com/2014/09/es6-modules-final.html)

## More on importing and exporting

### Importing 
ECMAScript 6 provides the following ways of importing 

```js
// Default exports and named exports
import theDefault, { named1, named2 } from 'src/mylib';
import theDefault from 'src/mylib';
import { named1, named2 } from 'src/mylib';

// Renaming: import named1 as myNamed1
import { named1 as myNamed1, named2 } from 'src/mylib';

// Importing the module as an object
// (with one property per named export)
import * as mylib from 'src/mylib';

// Only load the module, don’t import anything
import 'src/mylib';
```

### Exporting  

There are two ways in which you can export things that are inside the current module. On one hand, you can mark declarations with the keyword export.

```js
export var myVar1 = ...;
export let myVar2 = ...;
export const MY_CONST = ...;

export function myFunc() {
    ...
}
export function* myGeneratorFunc() {
    ...
}
export class MyClass {
    ...
}
```

The “operand” of a default export is an expression (including function expressions and class expressions). Examples:

```js
export default 123;
export default function (x) {
    return x
};
export default x => x;
export default class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};
```

On the other hand, you can list everything you want to export at the end of the module (which is once again similar in style to the revealing module pattern).

```js
const MY_CONST = ...;
function myFunc() {
    ...
}

export { MY_CONST, myFunc };
```
You can also export things under different names:

```js
export { MY_CONST as THE_CONST, myFunc as theFunc };
```
> Note that you can’t use reserved words (such as default and new) as variable names, but you can use them as names for exports (you can also use them as property names in ECMAScript 5). If you want to directly import such named exports, you have to rename them to proper variables names.

### Re-exporting

Re-exporting means adding another module’s exports to those of the current module. You can either add all of the other module’s exports:

```js
export * from 'src/other_module';
```

Or you can be more selective (optionally while renaming):

```js

export { foo, bar } from 'src/other_module';

// Export other_module’s foo as myFoo
export { foo as myFoo, bar } from 'src/other_module';
```

## `eval()` and modules

`eval()` does not support module syntax. It parses its argument according to the Script grammar rule and scripts don’t support module syntax (why is explained later). If you want to evaluate module code, you can use the module loader API (described next).

## The ECMAScript 6 module loader API

In addition to the declarative syntax for working with modules, there is also a [programmatic API](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-loader-objects). It allows you to:

- Programmatically work with modules and scripts
- Configure module loading

Loaders handle resolving *module specifiers* (the string IDs at the end of import...from), loading modules, etc. Their constructor is Reflect.Loader. Each platform keeps a customized instance in the global variable System (the system loader), which implements its specific style of module loading.

### Importing modules and loading scripts  

You can programmatically import a module, via an API based on ES6 promises:

```js
System.import('some_module')
.then(some_module => {
    // Use some_module
})
.catch(error => {
    ...
});
```

System.import() enables you to:

- Use modules inside `<script>` elements (where module syntax is not supported, consult Sect. “Further information” for details).
- Load modules conditionally.

System.import() retrieves a single module, you can use Promise.all() to import several modules:

```js
Promise.all(
    ['module1', 'module2', 'module3']
    .map(x => System.import(x)))
.then(([module1, module2, module3]) => {
    // Use module1, module2, module3
});
```

More loader methods:

- [System.module(source, options?)](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-reflect.loader.prototype.module) evaluates the JavaScript code in source to a module (which is delivered asynchronously via a promise).
- [System.set(name, module)](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-reflect.loader.prototype.set) is for registering a module (e.g. one you have created via System.module()).
- [System.define(name, source, options?)](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-reflect.loader.prototype.define) both evaluates the module code in source and registers the result.

### Configuring module loading

The module loader API has various hooks for configuration. It is still work in progress. A first system loader for browsers is currently being implemented and tested. The goal is to figure out how to best make module loading configurable.

The loader API will permit many customizations of the loading process. For example:

1. Lint modules on import (e.g. via JSLint or JSHint).
1. Automatically translate modules on import (they could contain CoffeeScript or TypeScript code).
1. Use legacy modules (AMD, Node.js).

Configurable module loading is an area where Node.js and CommonJS are limited.

## Further information

The following content answers two important questions related to ECMAScript 6 modules: How do I use them today? How do I embed them in HTML?

- [“Using ECMAScript 6 today”](http://2ality.com/2014/08/es6-today.html) gives an overview of ECMAScript 6 and explains how to compile it to ECMAScript 5. If you are interested in the latter, start reading in Sect. 2. One intriguing minimal solution is the ES6 Module Transpiler which only adds ES6 module syntax to ES5 and compiles it to either AMD or CommonJS.

- **Embedding ES6 modules in HTML**: The code inside `<script>` elements does not support module syntax, because the element’s synchronous nature is incompatible with the asynchronicity of modules. Instead, you need to use the new `<module>` element. The blog post “ECMAScript 6 modules in future browsers” explains how `<module>` works. It has several significant advantages over `<script>` and can be polyfilled in its alternative version `<script type="module">`.

- **CommonJS vs. ES6**: [“JavaScript Modules”](http://jsmodules.io/) (by Yehuda Katz) is a quick intro to ECMAScript 6 modules. Especially interesting is a [second page](http://jsmodules.io/cjs.html) where CommonJS modules are shown side by side with their ECMAScript 6 versions.

-------------------

Read more: http://2ality.com/2014/09/es6-modules-final.html