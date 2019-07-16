import isFunction from 'src/is-function-x';

let hasFat;
try {
  /* eslint-disable-next-line no-eval */
  eval('(x, y) => {return this;};');
  hasFat = true;
} catch (ignore) {
  // empty
}

const itHasFat = hasFat ? it : xit;

let hasGen;
try {
  /* eslint-disable-next-line no-eval */
  eval('function* idMaker(x, y){};');
  hasGen = true;
} catch (ignore) {
  // empty
}

const itHasGen = hasGen ? it : xit;

let hasAsync;
try {
  /* eslint-disable-next-line no-eval */
  eval('async function idAsync(x, y){};');
  hasAsync = true;
} catch (ignore) {
  // empty
}

const itHasAsync = hasAsync ? it : xit;

let hasClass;
try {
  /* eslint-disable-next-line no-eval */
  eval('"use strict"; class My {};');
  hasClass = true;
} catch (ignore) {
  // empty
}

const itHasClass = hasClass ? it : xit;

describe('basic tests', function() {
  it('should return `false` for everything', function() {
    expect.assertions(1);
    const values = [true, 'abc', 1, null, undefined, new Date(), [], /r/];
    const expected = values.map(function() {
      return false;
    });
    const actual = values.map(isFunction);
    expect(actual).toStrictEqual(expected);
  });

  it('should return `true` for everything', function() {
    expect.assertions(1);
    const values = [
      Object,
      String,
      Boolean,
      Array,
      Function,

      function() {},

      function test(a) {} /* eslint-disable-line no-unused-vars */,
      new Function(),

      function test1(a, b) {} /* eslint-disable-line no-unused-vars */,

      function test2(a /* , foo */) {} /* eslint-disable-line no-unused-vars */,

      function test3(a /* , foo */, b) {} /* eslint-disable-line no-unused-vars */,

      function test4(a /* , foo */, b) {} /* eslint-disable-line no-unused-vars */,

      function /* foo */ test5(a /* , foo */, b) {} /* eslint-disable-line no-unused-vars */,

      function /* foo */ test6 /* bar */(a /* , foo */, b) {} /* eslint-disable-line no-unused-vars */,

      function /* foo */ test7 /* bar */(/* baz */) {},

      /* fum */ function /* foo */ // blah
      test8(/* baz */ a) {} /* eslint-disable-line no-unused-vars */,
    ];
    const expected = values.map(function() {
      return true;
    });
    const actual = values.map(isFunction);
    expect(actual).toStrictEqual(expected);
  });

  itHasFat('should return `true` for arrow functions', function() {
    expect.assertions(1);
    const fat = new Function('return (x, y) => {return this;};')();
    expect(isFunction(fat)).toBe(true);
  });

  itHasGen('should return `true` for generator functions', function() {
    expect.assertions(1);
    const gen = new Function('return function* idMaker(x, y){};')();
    expect(isFunction(gen)).toBe(true);
  });

  itHasAsync('should return `true` for async functions', function() {
    expect.assertions(1);
    const asy = new Function('return async function idAsync(x, y){};')();
    expect(isFunction(asy)).toBe(true);
  });

  itHasClass('should return `false` for classes', function() {
    expect.assertions(1);
    const classes = new Function('"use strict"; return class My {};')();
    expect(isFunction(classes)).toBe(false);
  });

  itHasClass('should return `true` for classes if allowClass is truthy', function() {
    expect.assertions(1);
    const classes = new Function('"use strict"; return class My {};')();
    expect(isFunction(classes, true)).toBe(true);
  });
});
