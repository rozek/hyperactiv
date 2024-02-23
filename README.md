<h1 align="center">
    <img alt="Hyperactiv logo" src="https://cdn.rawgit.com/elbywan/hyperactiv/747e759b/logo.svg" width="100px"/>
	<br>
    Hyperactiv<br>
    <a href="https://www.npmjs.com/package/hyperactiv"><img alt="npm-badge" src="https://img.shields.io/npm/v/hyperactiv.svg?colorB=ff733e" height="20"></a>
    <a href="https://github.com/elbywan/hyperactiv/actions/workflows/ci.yml"><img alt="ci-badge" src="https://github.com/elbywan/hyperactiv/actions/workflows/ci.yml/badge.svg"></a>
    <a href='https://coveralls.io/github/elbywan/hyperactiv?branch=master'><img src='https://coveralls.io/repos/github/elbywan/hyperactiv/badge.svg?branch=master' alt='Coverage Status' /></a>
    <a href="https://bundlephobia.com/result?p=hyperactiv"><img src='https://img.shields.io/bundlephobia/minzip/hyperactiv.svg'/></a>
    <a href="https://github.com/elbywan/hyperactiv/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license-badge" height="20"></a>
</h1>

 <h4 align="center">
    A super tiny reactive library. ⚡️<br>
    <br>
</h4>

## Description

Hyperactiv is a super small (~ 1kb minzipped) library which **observes** object mutations and **computes** functions depending on those changes.

In other terms whenever a property from an observed object is **mutated**, every function that **depend** on this property are **called** right away.

Of course, Hyperactiv **automatically** handles these dependencies so you **never** have to explicitly declare anything. ✨

> compared to the [original](https://github.com/elbywan/hyperactiv), this fork adds
> - code to handle getters, setters and `defineProperty`
> - the capability of observing an object independent of specific keys
>
> To observe an object in general, simply `observe` it as usual and define a `computed` function for the exported symbol `modifiedProperty`:
>
> `import { observe, computed, modifiedProperty } from 'hyperactiv'`
> `const observedVariable = observe({})`
> `computed(() => console.log('modified property was',observedVariable[modifiedProperty]))`
>
> The `computed` function will now be called whenever _any_ property of `observedVariable` is modified - and `observedVariable[modifiedProperty]` will contain the key of the modified property

----

#### Minimal working example

```js
import hyperactiv from 'hyperactiv'
const { observe, computed } = hyperactiv

// This object is observed.
const observed = observe({
    a: 1,
    b: 2,
    c: 0
})

// Calling computed(...) runs the function and memorize its dependencies.
// Here, the function depends on properties 'a' and 'b'.
computed(() => {
    const { a, b } = observed
    console.log(`a + b = ${a + b}`)
})
// Prints: a + b = 3

// Whenever properties 'a' or 'b' are mutated…
observed.a = 2
// The function will automagically be called.
// Prints: a + b = 4

observed.b = 3
// Prints: a + b = 5

observed.c = 1
// Nothing depends on 'c', so nothing will happen.
```

## Demo

**[Paint demo](https://elbywan.github.io/hyperactiv/paint)**

**[React store demo](https://elbywan.github.io/hyperactiv/todos)**

**[React hooks demo](https://github.com/elbywan/hyperactiv-hooks-demo)**

## Setup

```bash
npm i hyperactiv
```

```html
<script src="https://unpkg.com/hyperactiv"></script>
```

## Import

**Hyperactiv is bundled as an UMD package.**

```js
// ESModules
import hyperactiv from 'hyperactiv'
```

```js
// Commonjs
const hyperactiv = require('hyperactiv')
```

```js
// Global variable
const { computed, observe, dispose } = hyperactiv
```

## Usage

#### 1. Observe object and arrays

```js
const object = observe({ one: 1, two: 2 })
const array = observe([ 3, 4, 5 ])
```

#### 2. Define computed functions

```js
let sum = 0

// This function calculates the sum of all elements,
// which is 1 + 2 + 3 + 4 + 5 = 15 at this point.
const calculateSum = computed(() => {
    sum = [
        ...Object.values(object),
        ...array
    ].reduce((acc, curr) => acc + curr)
})

// A computed function is called when declared.
console.log(sum) // -> 15
```

#### 3. Mutate observed properties

```js
// calculateSum will be called each time one of its dependencies has changed.

object.one = 2
console.log(sum) // -> 16
array[0]++
console.log(sum) // -> 17

array.unshift(1)
console.log(sum) // -> 18
array.shift()
console.log(sum) // -> 17
```

#### 4. Release computed functions

```js
// Observed objects store computed function references in a Set,
// which prevents garbage collection as long as the object lives.
// Calling dispose allows the function to be garbage collected.
dispose(calculateSum)
```

## Add-ons

#### Additional features that you can import from a sub path.

- **[hyperactiv/react](https://github.com/elbywan/hyperactiv/tree/master/src/react)**

*A simple but clever react store.*

- **[hyperactiv/http](https://github.com/elbywan/hyperactiv/tree/master/src/http)**

*A reactive http cache.*

- **[hyperactiv/handlers](https://github.com/elbywan/hyperactiv/tree/master/src/handlers)**

*Utility callbacks triggered when a property is mutated.*

- **[hyperactiv/classes](https://github.com/elbywan/hyperactiv/tree/master/src/classes)**

*An Observable class.*

- **[hyperactiv/websocket](https://github.com/elbywan/hyperactiv/tree/master/src/websocket)**

*Hyperactiv websocket implementation.*

## Performance

This repository includes a [benchmark folder](https://github.com/elbywan/hyperactiv/tree/master/bench) which pits `hyperactiv` against other libraries.

**Important: the benchmarked libraries are not equivalent in terms of features, flexibility and developer friendliness.**

While not the best in terms of raw performance `hyperactiv` is still reasonably fast and I encourage you to have a look at the different implementations to compare the library APIs. [For instance there is no `.get()` and `.set()` wrappers when using `hyperactiv`](https://github.com/elbywan/hyperactiv/blob/master/bench/layers.mjs#L361).

**Here are the raw results: _(100 runs per tiers, average time ignoring the 10 best & 10 worst runs)_**

![bench](./docs/bench.png)

> Each tier nests observable objects X (10/100/500/1000…) times and performs some computations on the deepest one. This causes reactions to propagate to the whole observable tree.


_**Disclaimer**: I adapted the code from [`maverickjs`](https://github.com/maverick-js/observables/tree/main/bench) which was itself a rewrite of the benchmark from [`cellx`](https://github.com/Riim/cellx#benchmark). I also wrote some MobX code which might not be the best in terms of optimization since I am not very familiar with the API._

## Code samples

#### A simple sum and a counter

```js
// Observe an object and its properties.
const obj = observe({
    a: 1,
    b: 2,
    sum: 0,
    counter: 0
})

// The computed function auto-runs by default.
computed(() => {
    // This function depends on a, b and counter.
    obj.sum = obj.a + obj.b
    // It also sets the value of counter, which is circular (get & set).
    obj.counter++
})

// The function gets executed when computed() is called…
console.log(obj.sum)     // -> 3
console.log(obj.counter) // -> 1
obj.a = 2
// …and when a or b are mutated.
console.log(obj.sum)     // -> 4
console.log(obj.counter) // -> 2
obj.b = 3
console.log(obj.sum)     // -> 5
console.log(obj.counter) // -> 3
```

#### Nested functions

```js
const obj = observe({
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    totalSum: 0
})

const aPlusB = () => {
    return obj.a + obj.b
}
const cPlusD = () => {
    return obj.c + obj.d
}

// Depends on a, b, c and d.
computed(() => {
    obj.totalSum = aPlusB() + cPlusD()
})

console.log(obj.totalSum) // -> 10
obj.a = 2
console.log(obj.totalSum) // -> 11
obj.d = 5
console.log(obj.totalSum) // -> 12
```

#### Chaining computed properties

```js
const obj = observe({
    a: 0,
    b: 0,
    c: 0,
    d: 0
})

computed(() => { obj.b = obj.a * 2 })
computed(() => { obj.c = obj.b * 2 })
computed(() => { obj.d = obj.c * 2 })

obj.a = 10
console.log(obj.d) // -> 80
```

#### Asynchronous computations

```js
// Promisified setTimeout.
const delay = time => new Promise(resolve => setTimeout(resolve, time))

const obj = observe({ a: 0, b: 0, c: 0 })
const multiply = () => {
    obj.c = obj.a * obj.b
}
const delayedMultiply = computed(

    // When dealing with asynchronous functions
    // wrapping with computeAsync is essential to monitor dependencies.

    ({ computeAsync }) =>
        delay(100).then(() =>
            computeAsync(multiply)),
    { autoRun: false }
)

delayedMultiply().then(() => {
    console.log(obj.b) // -> 0
    obj.a = 2
    obj.b = 2
    console.log(obj.c) // -> 0
    return delay(200)
}).then(() => {
    console.log(obj.c) // -> 4
})
```

#### Batch computations

```js
// Promisified setTimeout.
const delay = time => new Promise(resolve => setTimeout(resolve, time))

// Enable batch mode.
const array = observe([0, 0, 0], { batch: true })

let sum = 0
let triggerCount = 0

const doSum = computed(() => {
    ++triggerCount
    sum = array.reduce((acc, curr) => acc + curr)
})

console.log(sum) // -> 0

// Even if we are mutating 3 properties, doSum will only be called once asynchronously.

array[0] = 1
array[1] = 2
array[2] = 3

console.log(sum) // -> 0

delay(10).then(() => {
    console.log(`doSum triggered ${triggerCount} time(s).`) // -> doSum triggered 2 time(s).
    console.log(sum) // -> 6
})
```

#### Observe only some properties

```js
const object = {
    a: 0,
    b: 0,
    sum: 0
}

// Use props to observe only some properties
// observeA reacts only when mutating 'a'.

const observeA = observe(object, { props:  ['a'] })

// Use ignore to ignore some properties
// observeB reacts only when mutating 'b'.

const observeB = observe(object, { ignore: ['a', 'sum'] })

const doSum = computed(function() {
    observeA.sum = observeA.a + observeB.b
})

// Triggers doSum.

observeA.a = 2
console.log(object.sum) // -> 2

// Does not trigger doSum.

observeA.b = 1
observeB.a = 1
console.log(object.sum) // -> 2

// Triggers doSum.

observeB.b = 2
console.log(object.sum) // -> 3
```

#### Automatically bind methods

```javascript
let obj = new SomeClass()
obj = observe(obj, { bind: true })
obj.someMethodThatMutatesObjUsingThis()
// observe sees all!
```

#### This and class syntaxes

```js
class MyClass {
    constructor() {
        this.a = 1
        this.b = 2

        const _this = observe(this)

        // Bind computed functions to the observed instance.
        this.doSum = computed(this.doSum.bind(_this))

        // Return an observed instance.
        return _this
    }

    doSum() {
        this.sum = this.a + this.b
    }
}

const obj = new MyClass()
console.log(obj.sum) // -> 3
obj.a = 2
console.log(obj.sum) // -> 4
```

```js
const obj = observe({
    a: 1,
    b: 2,
    doSum: function() {
        this.sum = this.a + this.b
    }
}, {
    // Use the bind flag to bind doSum to the observed object.
    bind: true
})

obj.doSum = computed(obj.doSum)
console.log(obj.sum) // -> 3
obj.a = 2
console.log(obj.sum) // -> 4
```

## API

### observe

Observes an object or an array and returns a proxified version which reacts on mutations.

```ts
observe(Object | Array, {
    props: String[],
    ignore: String[],
    batch: boolean,
    deep: boolean = true,
    bind: boolean
}) => Proxy
```

**Options**

- `props: String[]`

Observe only the properties listed.

- `ignore: String[]`

Ignore the properties listed.

- `batch: boolean | int`

Batch computed properties calls, wrapping them in a setTimeout and executing them in a new context and preventing excessive calls.
If batch is an integer greater than zero, the calls will be debounced by the value in milliseconds.

- `deep: boolean`

Recursively observe nested objects and when setting new properties.

- `bind: boolean`

Automatically bind methods to the observed object.

### computed

Wraps a function and captures observed properties which are accessed during the function execution.
When those properties are mutated, the function is called to reflect the changes.

```ts
computed(fun: Function, {
    autoRun: boolean,
    callback: Function
}) => Proxy
```

**Options**

- `autoRun: boolean`

If false, will not run the function argument when calling `computed(function)`.

The computed function **must** be called **at least once** to calculate its dependencies.

- `callback: Function`

Specify a callback that will be re-runned each time a dependency changes instead of the computed function.

### dispose

Will remove the computed function from the reactive Maps (the next time an bound observer property is called) allowing garbage collection.

```ts
dispose(Function) => void
```

### batch

_Only when observables are created with the `{batch: …}` flag_

Will perform accumulated b.ed computations instantly.

```ts
const obj = observe({ a: 0, b: 0 }, { batch: true })
computed(() => obj.a = obj.b)
obj.b++
obj.b++
console.log(obj.a) // => 0
batch()
console.log(obj.a) // => 2
```

