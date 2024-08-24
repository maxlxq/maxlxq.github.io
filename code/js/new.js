/**
 * 1. 创建一个新对象
 * 2. 新对象的隐式原型指向构造函数的显式原型
 * 3. this指向 新对象
 * 4. 执行构造函数，如果返回 对象或函数，则返回该结果；如果不返回，则返回新对象
 */
function newFn() {
  const Constructor = Array.prototype.shift.apply(arguments);
  if (typeof Constructor !== 'function') {
    throw 'No Constructor Function';
  }

  const obj = Object.create(Constructor.prototype);
  // 或者如下写法
  // const obj = {};
  // obj.__proto__ = Constructor.prototype;

  const res = Constructor.apply(obj, arguments);
  const isObj = typeof res === 'object' && res !== null;
  const isFn = typeof res === 'function';

  return (isObj || isFn) ? res : obj;
}