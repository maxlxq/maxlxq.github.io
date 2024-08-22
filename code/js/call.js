Function.prototype.callFn = function(context) {
  context = context ? Object(context) : window;
  const key = Symbol();
  context[key] = this;

  const rest = [...arguments].slice(1);
  const result = context[key](...rest);

  delete context[key];
  return result;
}