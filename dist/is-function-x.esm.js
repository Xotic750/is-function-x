import attempt from 'attempt-x';
import toBoolean from 'to-boolean-x';
import toStringTag from 'to-string-tag-x';
import hasToStringTag from 'has-to-string-tag-x';
import isPrimitive from 'is-primitive-x';
import normalise from 'normalize-space-x';
import deComment from 'replace-comments-x';
var FunctionCtr = attempt.constructor;
var SPACE = ' ';
var fToString = attempt.toString;
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var asyncTag = '[object AsyncFunction]';
var ctrRx = /^class /;
var test = ctrRx.test;
var hasNativeClass = attempt(function attemptee() {
  /* eslint-disable-next-line babel/new-cap */
  return FunctionCtr('"use strict"; return class My {};')();
}).threw === false;

var testClassString = function testClassString(value) {
  return test.call(ctrRx, normalise(deComment(fToString.call(value), SPACE)));
};

var isES6ClassFn = function isES6ClassFunc(value) {
  var result = attempt(testClassString, value);
  return result.threw === false && result.value;
};
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @private
 * @param {*} value - The value to check.
 * @param {boolean} allowClass - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */


var tryFuncToString = function funcToString(value, allowClass) {
  if (hasNativeClass && allowClass === false && isES6ClassFn(value)) {
    return false;
  }

  return attempt.call(value, fToString).threw === false;
};

var compareTags = function compareTags(value) {
  var strTag = toStringTag(value);
  return strTag === funcTag || strTag === genTag || strTag === asyncTag;
};
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [allowClass=false] - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */


var isFunction = function isFunction(value, allowClass) {
  if (isPrimitive(value)) {
    return false;
  }

  if (hasToStringTag) {
    return tryFuncToString(value, toBoolean(allowClass));
  }

  if (hasNativeClass && toBoolean(allowClass) === false && isES6ClassFn(value)) {
    return false;
  }

  return compareTags(value);
};

export default isFunction;

//# sourceMappingURL=is-function-x.esm.js.map