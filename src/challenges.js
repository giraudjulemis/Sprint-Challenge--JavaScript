/* ======================== CallBacks Practice ============================ */
const each = (elements, cb) => {
  // Iterates over a list of elements, yielding each in turn to the `cb` function.
  // This only needs to work with arrays.
  for (let i = 0; i < elements.length; i++) {
    cb(elements[i], i);
  }
};

const map = (elements, cb) => {
  // Produces a new array of values by mapping each value in list through a transformation function (iteratee).
  // Return the new array.
  const newArray = [];
  elements.forEach(item => {
    newArray.push(cb(item));
  });
  return newArray;
};

/* ======================== Closure Practice ============================ */
const limitFunctionCallCount = (cb, n) => {
  // Should return a function that invokes `cb`.
  // The returned function should only allow `cb` to be invoked `n` times.
  let timesInvoked = 0;
  return (...args) => {
    if (timesInvoked === n) {
      return null;
    }
    timesInvoked++;
    return cb(...args);
  };
};

const cacheFunction = cb => {
  // Should return a funciton that invokes `cb`.
  // A cache (object) should be kept in closure scope.
  // The cache should keep track of all arguments have been used to invoke this function.
  // If the returned function is invoked with arguments that it has already seen
  // then it should return the cached result and not invoke `cb` again.
  // `cb` should only ever be invoked once for a given set of arguments.
  const cache = {};
  return (...input) => {
    if (Object.prototype.hasOwnProperty.call(cache, input)) {
      return cache[input];
    }
    cache[input] = cb(...input);
    return cache[input];
  };
};

/* eslint-enable no-unused-vars */

/* ======================== Recursion Practice ============================ */
const reverseStr = str => {
  // reverse str takes in a string and returns that string in reversed order
  // The only difference between the way you've solved this before and now is that you need to do it recursivley!
  if (str.length <= 1) {
    return str;
  }
  return reverseStr(str.substring(str.length, 1)) + str[0];
};

const checkMatchingLeaves = obj => {
  // return true if every property on `obj` is the same
  // otherwise return false
  const destruct = input => {
    if (!Object.is(Object(input), input)) {
      return input;
    }
    const keys = Object.keys(input);
    const first = input[keys[0]];
    return Object.is(Object(first), first) ? destruct(first) : first;
  };
  const keys = Object.keys(obj);
  const first = obj[keys[0]];
  for (let i = 0; i < keys.length; i++) {
    const current = obj[keys[i]];
    if (Object.is(Object(current), current) && !checkMatchingLeaves(current)) {
      return false;
    }
    if (!Object.is(destruct(current), destruct(first))) {
      return false;
    }
  }
  return true;
};

const flatten = elements => {
  // Flattens a nested array (the nesting can be to any depth).
  // Example: flatten([1, [2], [3, [[4]]]]); => [1, 2, 3, 4];
  return elements.reduce((memo, item) => {
    return memo.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};

module.exports = {
  each,
  map,
  limitFunctionCallCount,
  cacheFunction,
  reverseStr,
  checkMatchingLeaves,
  flatten,
};
