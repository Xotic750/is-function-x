import attempt from 'attempt-x';
import toBoolean from 'to-boolean-x';
import toStringTag from 'to-string-tag-x';
import hasToStringTag from 'has-to-string-tag-x';
import isPrimitive from 'is-primitive';
import normalise from 'normalize-space-x';
import deComment from 'replace-comments-x';

const FunctionCtr = attempt.constructor;
const SPACE = ' ';
const fToString = attempt.toString;
const funcTag = '[object Function]';
const genTag = '[object GeneratorFunction]';
const asyncTag = '[object AsyncFunction]';
const ctrRx = /^class /;
const {test} = ctrRx;

const hasNativeClass =
  attempt(function attemptee() {
    /* eslint-disable-next-line babel/new-cap */
    return FunctionCtr('"use strict"; return class My {};')();
  }).threw === false;

const testClassString = function testClassString(value) {
  return test.call(ctrRx, normalise(deComment(fToString.call(value), SPACE)));
};

const isES6ClassFn = function isES6ClassFunc(value) {
  const result = attempt(testClassString, value);

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
const tryFuncToString = function funcToString(value, allowClass) {
  if (hasNativeClass && allowClass === false && isES6ClassFn(value)) {
    return false;
  }

  return attempt.call(value, fToString).threw === false;
};

const compareTags = function compareTags(value) {
  const strTag = toStringTag(value);

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
const isFunction = function isFunction(value, allowClass) {
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
