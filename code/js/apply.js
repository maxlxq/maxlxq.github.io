Function.prototype.applyFn = function(ctx, arr) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }

  ctx = ctx || window;
  const key = Symbol();
  ctx[key] = this;

  const res = !arr ? ctx[key]() : ctx[key](arr);

  delete ctx[key];
  return res;
}