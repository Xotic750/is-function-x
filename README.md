<a
  href="https://travis-ci.org/Xotic750/is-function-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/is-function-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/is-function-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-function-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/is-function-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-function-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/is-function-x"
  title="npm version">
<img src="https://badge.fury.io/js/is-function-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/is-function-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/is-function-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/is-function-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/is-function-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/is-function-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/is-function-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_is-function-x"></a>

## is-function-x

Determine whether a given value is a function object.

<a name="exp_module_is-function-x--module.exports"></a>

### `module.exports(value, [allowClass])` ⇒ <code>boolean</code> ⏏

Checks if `value` is classified as a `Function` object.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
else `false`.

| Param        | Type                 | Default            | Description                    |
| ------------ | -------------------- | ------------------ | ------------------------------ |
| value        | <code>\*</code>      |                    | The value to check.            |
| [allowClass] | <code>boolean</code> | <code>false</code> | Whether to filter ES6 classes. |

**Example**

```js
import isFunction from 'is-function-x';

console.log(isFunction()); // false
console.log(isFunction(Number.MIN_VALUE)); // false
console.log(isFunction('abc')); // false
console.log(isFunction(true)); // false
console.log(isFunction({name: 'abc'})); // false
console.log(isFunction(function() {})); // true
console.log(isFunction(new Function())); // true
console.log(isFunction(function* test1() {})); // true
console.log(isFunction(function test2(a, b) {})); // true
console.log(isFunction(async function test3() {})); // true
console.log(isFunction(class Test {})); // false
console.log(isFunction(class Test {}, true)); // true
console.log(
  isFunction((x, y) => {
    return this;
  }),
); // true
```
