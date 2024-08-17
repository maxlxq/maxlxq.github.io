# Symbol

> 基本数据类型。
> Symbol() 函数会返回 `symbol` 类型的值，具有静态属性和静态方法。
> 作为构造函数并不完整，不支持语法：`new Symbol()`
>
> Symbol() 返回的 symbol 值都是唯一的。

仅有目的：作为对象属性的标识符。

## 属性

### Symbol.asyncIterator
>
> @@asyncIterator ｜ ❌ IE 不支持

`Symbol.asyncIterator` 指定一个对象的默认异步迭代器。如果一个对象设置了这个属性，就是异步可迭代对象，可用 `for await ... of` 循环

### Symbol.prototype.description
>
> description 返回 Symbol 对象的可选描述的字符串

```javascript
Symbol('description').toString()
// "Symbol(description)"
Symbol('description').description
// "description"
Symbol('').description
// ""
Symbol().description
// undefined
Symbol.iterator.toString()
// "Symbol(Symbol.iterator)"
Symbol.iterator.description
// "Symbol.iterator"
Symbol.for('foo').toString()
// "Symbol(foo)"
Symbol.for('foo').description
// "foo"
```

### Symbol.hasInstance
>
> Symbol.hasInstance 用于判断某对象是否为某构造器的实例。 因此可以用它自定义 instanceof 操作符在某个类上的行为。

```javascript
class MyArray {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance);
    }
}
console.log([] instanceof MyArray)
// true
```

Symbol.hasInstance 属性的属性特性：
`writable: false`,
`enumerable: false`,
`configurable: false`

### Symbol.isConcatSpreadable
>
> Symbol.isConcatSpreadable 符号用于配置某对象作为 Array.prototype.concat() 方法的参数时是否展开其数组元素。
>
> @@isConcatSpreadable 可以直接定义为对象属性或继承而来，布尔类型。

可以控制数组或类数组的对象的行为，如下

```javascript
const alpha = ['a', 'b', 'c']
const numeric = [1, 2, 3]
let alphaNumeric = alpha.concat(numeric)
alphaNumeric
// (6) ["a", "b", "c", 1, 2, 3]
numeric[Symbol.isConcatSpreadable] = false
// false
alphaNumeric = alpha.concat(numeric)
// (4) ["a", "b", "c", Array(3)]
```

### Symbol.iterator
>
> Symbol.iterator 为每一个对象定义了默认的迭代器，可以被 for...of 循环使用

一些内置类型拥有默认的迭代器行为，其他类型(如：Object)则没有

`Array.prototype[@@iterator]()`
`TypedArray.prototype[@@iterator]()`
`String.prototype[@@iterator]()`
`Map.prototype[@@iterator]()`
`Set.prototype[@@iterator]()`

```javascript
let myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}
// ƒ* () {
//     yield 1;
//     yield 2;
//     yield 3;
// }
console.log([...myIterable])
// (3) [1, 2, 3]
```

### Symbol.match
>
> Symbol.match 指定了匹配的是正则表达式而不是字符串。 String.prototype.match() 会调用此函数。
>
还用于标识对象是否具有正则表达式行为。
如：String.prototype.startsWith(),String.prototype.endsWith() 和 String.prototype.includes() 会检查第一个参数是否是正则表达式，是则会抛出 TypeError。
但是如果将 Symbol.match 设置为 false，则使用 match 属性的表达式检查会认为该对象不是正则表达式对象，不会抛出 TypeError

```javascript
const reg = /foo/
'/foo/'.startsWith(reg)
// VM12157:1 Uncaught TypeError: First argument to String.prototype.startsWith must not be a regular expression at String.startsWith (<anonymous>) at <anonymous>:1:9 (anonymous) @ VM12157:1
reg[Symbol.match] = false
// false
'/foo/'.startsWith(reg)
// true
'/bar/'.endsWith(reg)
// false
```

### Symbol.matchAll ??
>
> Symbol.matchAll 返回一个迭代器，根据字符串生成正则表达式的匹配项。String.prototype.matchAll() 方法调用此函数。

```javascript
'abc'.matchAll(/a/)
// VM282:1 Uncaught TypeError: String.prototype.matchAll called with a non-global RegExp argument at String.matchAll (<anonymous>) at <anonymous>:1:7 (anonymous) @ VM282:1
/a/[Symbol.matchAll]('abc')
// RegExpStringIterator {}
```

### Symbol.replace
>
> Symbol.replace 指定了当一个字符串替换所匹配字符串时所调用的方法。 String.prototype.replace() 会调用此方法。

详见 RegExp.prototype[@@replace]\() 和 String.prototype.replace()

```javascript
class Replace1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.replace](string) {
    return `s/${string}/${this.value}/g`;
  }
}

'foo'.replace(new Replace1('bar'))
// "s/foo/bar/g"
```

### Symbol.search
>
> Symbol.search 指定了一个搜索方法，接受用户输入的正则表达式，返回该正则表达式在字符串中匹配到的下标。 String.prototype.search() 调用此方法。

详见 RegExp.prototype[@@search]() 和String.prototype.search().

```javascript
class caseInsensitiveSearch {
  constructor(value) {
    this.value = value.toLowerCase();
  }
  [Symbol.search](string) {
    return string.toLowerCase().indexOf(this.value);
  }
}

'foobar'.search(new caseInsensitiveSearch('BaR'))
// 3
```

### Symbol.species
>
> Symbol.species 是个函数值属性，其被构造函数用以创建派生对象。

在扩展数组类 MyArray 上返回 Array 对象。
例如：当使用例如 map() 这样的方法返回默认的构造函数时，你希望这些方法能够返回父级的 Array 对象，以取代 MyArray 对象

```javascript
class MyArray extends Array {
  // 覆盖 species 到父级的 Array 构造函数上
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array);   // true
```

### Symbol.split
>
> Symbol.split 指向和一个正则表达式的索引处分割字符串的方法。 String.prototype.split() 调用

```javascript
class Split1 {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    const index = string.indexOf(this.value);
    return `${this.value}${string.substr(0, index)}/${string.substr(index + this.value.length)}`;
  }
}

console.log('foobar'.split(new Split1('foo')));
// "foo/bar"
```

### Symbol.toPrimitive
>
> Symbol.toPrimitive 是一个内置的 Symbol 值，作为对象的函数值属性存在，当一个对象转换为对应的原始值时，会调用此函数。

```javascript
const object1 = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 42;
    } else if (hint === 'string') {
      return '123';
    } else {
      return null;
    }
  }
};

console.log(+object1, `${object1}456`, !object1)
// 42 "123456" false
```

### Symbol.toStringTag
>
> Symbol.toStringTag 是一个内置 symbol，通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。

```javascript
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "Validator";
  }
}

Object.prototype.toString.call(new ValidatorClass())
// "[object Validator]"
```

### Symbol.unscopables
>
> Symbol.unscopables 用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称

```javascript
const object1 = {
  property1: 42
};

with(object1) {
    console.log(property1)
}
// 42

object1[Symbol.unscopables] = {
  property1: true
};
// {property1: true}
with(object1) {
    console.log(property1)
}
// Uncaught ReferenceError: property1 is not defined
```

## 方法

### Symbol.for()
>
> Symbol.for(key) 根据给定的 key，从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则会新建一个与该键关联的 symbol，并放入全局 symbol 注册表中

```javascript
Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol

Symbol.for("bar") === Symbol.for("bar"); // true，证明了上面说的
Symbol("bar") === Symbol("bar"); // false，Symbol() 函数每次都会返回新的一个 symbol

var sym = Symbol.for("mario");
sym.toString();
// "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串
```

### Symbol.keyFor()
>
> Symbol.keyFor(sym) 方法用来获取全局symbol 注册表中与某个 symbol 关联的键。

如果全局注册表中查找到该 symbol，则返回该 symbol 的 key 值，返回值为字符串类型。否则返回 undefined

```javascript
// 创建一个全局 Symbol
var globalSym = Symbol.for("foo");
Symbol.keyFor(globalSym); // "foo"

var localSym = Symbol();
Symbol.keyFor(localSym); // undefined，

// 以下Symbol不是保存在全局Symbol注册表中
Symbol.keyFor(Symbol.iterator) // undefined
```

### Symbol.prototype.toString()
>
> toString() 方法返回当前 symbol 对象的字符串表示。
>
> Symbol 对象拥有自己的 toString 方法，因而遮蔽了原型链上的 Object.prototype.toString()。

symbol 原始值不能转换为字符串，所以只能先转换成它的包装对象，再调用 toString() 方法

```javascript
Symbol("foo") + "bar";
// TypeError: Can't convert symbol to string
Symbol("foo").toString() + "bar"
// "Symbol(foo)bar"，就相当于下面的:
Object(Symbol("foo")).toString() + "bar"
// "Symbol(foo)bar"
```

### Symbol.prototype.valueOf()
>
> valueOf() 方法返回当前 symbol 对象所包含的 symbol 原始值。

在 JavaScript 中，虽然大多数类型的对象在某些操作下都会自动的隐式调用自身的 valueOf() 方法或者 toString() 方法来将自己转换成一个原始值，但 symbol 对象不会这么干，symbol 对象无法隐式转换成对应的原始值

```javascript
Object(Symbol("foo")) + "bar";
// TypeError: can't convert symbol object to primitive
// 无法隐式的调用 valueOf() 方法

Object(Symbol("foo")).valueOf() + "bar";
// TypeError:  can't convert symbol to string
// 手动调用 valueOf() 方法，虽然转换成了原始值，但 symbol 原始值不能转换为字符串

Object(Symbol("foo")).toString() + "bar";
// "Symbol(foo)bar"，需要手动调用 toString() 方法才行
```
