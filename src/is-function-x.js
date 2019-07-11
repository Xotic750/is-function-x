import attempt from 'attempt-x';
import toBoolean from 'to-boolean-x';
import isFalsey from 'is-falsey-x';
import toStringTag from 'to-string-tag-x';
import hasToStringTag from 'has-to-string-tag-x';
import isPrimitive from 'is-primitive';
import normalise from 'normalize-space-x';
import deComment from 'replace-comments-x';

const fToString = Function.prototype.toString;
const funcTag = '[object Function]';
const genTag = '[object GeneratorFunction]';
const asyncTag = '[object AsyncFunction]';
const ctrRx = /^class /;
const {test} = ctrRx;

const hasNativeClass =
  attempt(() => {
    /* eslint-disable-next-line no-new-func */
    return Function('"use strict"; return class My {};')();
  }).threw === false;

const testClassstring = function _testClassstring(value) {
  return test.call(ctrRx, normalise(deComment(fToString.call(value), ' ')));
};

const isES6ClassFn = function isES6ClassFunc(value) {
  const result = attempt(testClassstring, value);

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

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [allowClass=false] - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */
export default function isFunction(value, allowClass) {
  if (isPrimitive(value)) {
    return false;
  }

  if (hasToStringTag) {
    return tryFuncToString(value, toBoolean(allowClass));
  }

  if (hasNativeClass && isFalsey(allowClass) && isES6ClassFn(value)) {
    return false;
  }

  const strTag = toStringTag(value);

  return strTag === funcTag || strTag === genTag || strTag === asyncTag;
}
