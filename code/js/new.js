
function newFn() {
  const Constructor = Array.prototype.shift.apply(arguments);
  if (typeof Constructor !== 'function') {
    throw 'No Constructor Function';
  }

  const obj = Object.create(Constructor.prototype);
  const res = Constructor.apply(obj, arguments);
  const isObj = typeof res === 'object' && res !== null;
  const isFn = typeof res === 'function';

  return (isObj || isFn) ? res : obj;
}