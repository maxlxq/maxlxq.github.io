
# JSX 代码如何变成 DOM 的

## 关于 JSX 的三个问题

1. JSX 的本质是什么，和 JS 是什么关系
2. 为什么要用 JSX？
3. JSX 背后的功能模块是什么，每个模块做了什么事？

### JSX 的本质：JavaScript 的语法扩展

- JSX 语法是如何在 JavaScript 中生效的：认识 Babel。

JSX 的定位是 JavaScript 的扩展，而非特定版本的 JavaScript，所以浏览器并不会像天然支持 JavaScript 一样支持 JSX。

React 官网指出：
> JSX 会被编译为 React.createElement()，React.createElement() 将返回一个叫做 React Element 的JS 对象。

所以 JSX 在被编译后，会变成一个 React.createElement() 的调用。而编译这个动作，是由 Babel 来完成的。

- 什么是 Babel 呢？
> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版的浏览器或其他环境中。

如，模板字符串 语法，Babel 会帮我们转转为大部分低版本浏览器也能够识别的 ES5 代码。

```javascript
const name = 'dan'
const place = 'home'
`Hello ${name}, ready for ${place}?`

// 转换后
"Hello ".concat(name, ", ready for ").concat(place, "?")
```

所以 Babel 也具备将 JSX 语法转换为 JavaScript 代码的能力。

Babel 将所有的 JSX 标签都转换为 React.createElement() 调用。

所以  JSX 的本质是 React.createElement 这个 JavaScript 调用的语法糖。

- React 选用 JSX 语法的动机

为什么 React 官方不直接使用 React.createElement 来创建元素呢。

JSX 代码层次分明、嵌套关系清晰；而 React.createElement 代码则是一种非常混乱的感觉，编写不容易，阅读更是吃力。

JSX 语法糖允许前端开发者使用最为熟悉的类 HTML 标签语法来创建虚拟 DOM，在降低学习成本的同时，也提升了研发效率和研发体验。

- JSX 是如何映射为 DOM 的

<details>
<summary>
createElement - React master branch 2021/06/12
</summary>

> 已省略部分 __DEV__ 代码
```javascript
/**
 * Create and return a new ReactElement of the given type.
 * path: react/packages/react/src/ReactElement.js line - 470
 */
export function createElement(type, config, children) {
  // propName 变量用于存储后面需要用到的元素属性
  let propName;

  // props 变量用于存储元素属性的键值集合
  const props = {};

  // key、ref、self、source 均为 Ract 元素属性
  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // config 对象中存储的是元素的属性
  if (config != null) {
    // 依次对 ref、key、self 和 source 属性赋值
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key; // key 字符串化
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (
        // 筛选可以挪到 props 对象中的属性
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  // childrenLength 是 arguments 的长度减去 2，去除 type 和 config 这两个参数。
  const childrenLength = arguments.length - 2;
  // 若剩下一个参数，则一边表示为文本节点
  if (childrenLength === 1) {
    // 直接赋值给 props.children
    props.children = children;
    // 处理嵌套多个子元素的情况
  } else if (childrenLength > 1) {
    // 声明固定长度数组
    const childArray = Array(childrenLength);
    // 把子元素推进数组
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    // 最后把数组赋值给 props.children
    props.children = childArray;
  }

  // Resolve default props
  // 处理 defaultProps
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // 最后调用一个 ReactElement 方法，传入处理后的参数
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```
</details>

1. 入参解读

入参共有 3 个。
- type：用于标识节点类型。可以使 `div`、`h1` 这种标准的 HTML 标签字符串，也可以是 React 组件类型
- config：以对象形式传入，组件所有的属性都会以键值对的形式存储在 config 对象中
- children：以对象形式传入，它记录的是组件标签之间嵌套的内容。

<details>
<summary>
调用示例：
</summary>

```javascript
React.createElement(
  'ul',
  { className: 'list' },
  React.createElement('li', { key: '1' }, '1'),
  React.createElement('li', { key: '2' }, '2'),
  React.createElement('li', { key: '3' }, '3')
)
```

// 对应的 DOM 结构如下
```jsx
<ul className="list">
  <li key="1">1</li>
  <li key="2">2</li>
  <li key="3">3</li>
</ul>
```
</details>

createElement 解读

- 二次处理 key、ref、self、source
- 遍历 config，筛选出可以存储到 props 中的属性
- 提取子元素，加入到 childArray 或 props.children 中
- 格式化 defaultProps
- 发起 ReactElement 调用

createElement 并没有十分复杂的算法或真实 DOM 的逻辑，每一步几乎都是在处理数据。相当于一个数据处理层。

so，我们可以称 createElement 为一个参数中介，接下来继续查看 ReactElement。

<details>
<summary>
ReactElement - React master branch 2021/06/12
</summary>

```javascript
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 * path: react/packages/react/src/ReactElement.js line - 127
 */
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // 常量，标识该对象是一个 ReactElement
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    // 内置属性赋值
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    // 记录创造该元素的组件
    _owner: owner,
  };

  return element;
};
```
</details>

ReactElement 只把所有的入参按照规范创建了一个对象 element，并返回给 React.createElement

如下示例，返回的确实是一个 ReactElement 对象实例
```javascript
function App() {
  return (
    <div className="App">
      <h1 className='title'>title h1</h1>
      <p className='content'>content h1</p>
    </div>
  );
}

console.log(App())
// {$$typeof: Symbol(react.element), type: "div", key: null, ref: null, props: {…}, …}
// $$typeof: Symbol(react.element)
// key: null
// props:
//   children: Array(2)
//     0:
//       $$typeof: Symbol(react.element)
//       key: null
//       props: {className: "title", children: "title h1"}
//       ref: null
//       type: "h1"
//       _owner: null
//       _store: {validated: true}
//       _self: undefined
//       _source: {fileName: "/Users/maxlxq/WebstormProjects/react_todo/src/App.js", lineNumber: 6, columnNumber: 7}
//       __proto__: Object
//     1:
//       $$typeof: Symbol(react.element)
//       key: null
//       props: {className: "content", children: "content h1"}
//       ref: null
//       type: "p"
//       _owner: null
//       _store: {validated: true}
//       _self: undefined
//       _source: {fileName: "/Users/maxlxq/WebstormProjects/react_todo/src/App.js", lineNumber: 7, columnNumber: 7}
//       __proto__: Object
//     length: 2
//     __proto__: Array(0)
//   className: "App"
//   __proto__: Object
// ref: null
// type: "div"
// _owner: null
// _store: {validated: false}
// _self: undefined
// _source: {fileName: "/Users/maxlxq/WebstormProjects/react_todo/src/App.js", lineNumber: 5, columnNumber: 5}
// __proto__: Object
```

本质上存储的是 以 JavaScript 对象形式存在的 DOM 的描述，即 虚拟 DOM 的一个节点。

既然是 虚拟 DOM，那么就还需要真正地渲染到 页面上，这里需要 ReactDOM.render 方法。

<details>
<summary>
ReactDOM.render  - React master branch 2021/06/13
</summary>

```javascript
export function render(
  element: React$Element<any>,
  container: Container,
  callback: ?Function
) {
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.',
  );

  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}
```

```javascript
// lagacy render 子树到容器中
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>, // null, 表示 根节点
  children: ReactNodeList, // 自身子节点数组
  container: Container,  // 真实 DOM 容器
  forceHydrate: boolean, // 是否需要保留一些已经存在的元素，调用 render 时已设置为 false；服务端渲染的话 设置为 true
  callback: ?Function  // render 之后的回调
) {
  let root = container._reactRootContainer;
  let fiberRoot: FiberRoot;
  if (!root) {
    // Initial mount 初次挂载
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Initial mount should not be batched.
    // 初次加载不用做批处理
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Update
    updateContainer(children, fiberRoot, parentComponent, callback);
  }
  return getPublicRootInstance(fiberRoot);
}
```
</details>

接收三个入参
- element：需要渲染的元素 ReactElement
- container：需要挂载的目标容器 真实 DOM
- callback：可选 回调函数，处理渲染后的逻辑

[一些源码解析](https://cybqd.com/react%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/react-dom%E4%B8%AD%E5%88%9B%E5%BB%BA%E7%9A%84%E4%B8%80%E7%B3%BB%E5%88%97%E7%8E%A9%E6%84%8F.html#reactdom-render "部分源码解析")
