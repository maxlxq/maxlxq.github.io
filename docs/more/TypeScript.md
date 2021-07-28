
# TypeScript

## 选择 TypeScript 的原因

### TypeScript 的本质

TypeScript 是 JavaScript 的超集，可以理解为 添加了类型注解的 JavaScript，本质上与 JavaScript 并无区别。

### TypeScript 的可靠性

TypeScript 的静态类型检查，让部分 JavaScript 错误（主要是一些低级错误）能在开发阶段就能被发现并解决。

当 TypeScript 类型检测能力覆盖到整个项目代码后，任意破坏约定的改动都能被自动检测出来，并提出类型错误。
因此，可以放心地修改、重构业务逻辑，而不用过分担忧因为考虑不周而犯下低级错误。

### 面向接口编程

编写 TypeScript 类型注解，本质上就是接口设计。
TypeScript 极大可能改变你的思维方式，从而逐渐养成一个好习惯。

编写具体的逻辑之前，我们需要设计好数据结构、编写类型注解，并按照接口约定实现业务逻辑。

同时，了解了接口约定的重要性，也会约束自己或他人设计接口、编写注解、遵守约定。

### TypeScript 正成为主流

相对于 Flow 而言，TypeScript 更具备类型编程的优势。越来越多的框架选择使用 TypeScript 编写源码，亦或是为 TypeScript 提供了完美支持。

# TypeScript 入门

全局安装 typescript

```shell
yarn global add typescript
yarn global add ts-node

# or
npm i -g typescript
npm i -g ts-node

# 查看版本
tsc -v
```

## TypeScript 与 JavaScript 有何不同

TypeScript 是类型化的 JavaScript，支持 JavaScript 的所有特性，还添加了静态类型注解扩展。

```typescript
// number 表示数字类型，: 用来分割变量和类型的分隔符
let num: number = 1
```

## 简单基础类型

number 也可以换为其他类型，如 JavaScript 的原始类型：number、string、boolean、null、undefined、symbol 等。

当右值类型与左侧类型不一致时，同步进行的静态类型检测就会提示这里有问题。

## 复杂基础类型

### 数组类型

可以直接使用 [] 的形式定义数组类型
```typescript
let arrayOfNumber: number[] = [1, 2, 3]

let arrayOfString: string[] = ['x', 'y', 'z']
```

也可以使用 Array 泛型定义数组类型
```typescript
let arrayOfNumber: Array<number> = [1, 2, 3]

let arrayOfString: Array<string> = ['x', 'y', 'z']
```

两者本质上没有区别，更推荐使用 [] 写法。可以避免与 JSX 的语法冲突，也能减少代码量。

### 特殊类型

- any

any 指的是一个任意类型。TypeScript 会选择性地忽略静态类型检测。

将一个基于 JavaScript 的应用改造成 TypeScript 的过程中，可以借助 any 来选择性添加、删除某些模块的检测，直至逐步替换掉所有的 JavaScript。

- unknown

unknown 描述类型并不确定的变量。

- void

void 仅适用于表示没有返回值的函数

- undefined

undefined 表示一个可缺省、未定义的属性。

- null

null 表明对象或属性可能是空值。

- never

never 表示永远不会返回值的类型。
never 是所有类型的子类型。

- object

object 类型表示非原始类型的类型。

## 什么是字面量类型、类型推断、类型拓宽和类型缩小

### 类型推断

在 TypeScript 中，类型标注声明是在变量之后。

使用类型标注后置的好处是编译器可以通过代码所在的上下文推导其对应的类型，无需再声明变量类型。

### 上下文推断

变量的类型可以通过被赋值的值进行推断。在某些特定情况下，也可以通过变量所在的上下文环境推断变量的类型。

```typescript
{
  let str = 'this is string' // str: string
  let num = 1 // num: number
  let bool = true // bool: boolean
}

{
  const str = 'this is string' // str: 'this is string'
  const num = 1 // num: 1
  const bool = true // bool: true
}
```

### 字面量类型

字面量不仅可以表示值，还可以表示类型，即字面量类型。

TypeScript 支持 3 种字面量类型：字符串、数字、布尔。对应的字面量分别拥有与其值一样的字面量类型。

```typescript
{
  let specifiedStr: 'this is string' = 'this is string'
  let str: string = 'any string'
  specifiedStr = str // ts(2322) 类型 '"string"' 不能赋值给类型 'this is string'
  str = specifiedStr // ok
}
```

### 字符串字面量类型

单个字面量类型并没有太大的用处，将多个字面量类型组合成一个脸和类型，用来描述拥有明确成员的使用的集合。

```typescript
type Direction = 'up' | 'down'
```

相较于 string 类型，使用字面量类型（组合的联合类型）可以将变量限定为更具体的类型。

### 数字字面量类型及布尔字面量类型

与字符串字面量类型类似，举个例子
```typescript
interface Config {
    size: 'small' | 'big'
    isEnable:  true | false
    margin: 0 | 2 | 4
}
```

再看通过 let 和 const 定义的变量的值相同，而变量类型不一致的具体原因。

const 定义为一个不可变更的常量，在缺省类型注解的情况下，TypeScript 推断出它的类型直接由赋值字面量的类型决定。

let 定义的变量，在缺省类型注解时，会转换为赋值字面量类型的父类型。
这种将字面量子类型转换为父类型的设计称之为"literal widening"，也就是字面量类型的拓宽。

### Literal Widening

所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足制定了初始值且未显示添加类型注解的条件，那么推断出来的类型就是指定的初始值字面量类型拓宽之后的类型。
这就是字面量类型拓宽。

### Type Widening

对 null、undefined 类型进行拓宽，通过 let、var 定义的变量如果满足未显示声明类型注解且被赋予了 null 或 undefined 值，则推断出这些变量的类型是 any

### Type Narrowing

类型缩小。使用类型守卫将函数参数的类型从 any 缩小到明确的类型。

## 函数类型：返回值类型和参数类型到底如何定义

```typescript
const add = (a: number, b: number): number => {
    return a + b
}
```

### 返回值类型

函数如果没有返回值，则使用 void 类型表示。

```typescript
function fn(): void {}
```

可以使用类似定义箭头函数的愈发来表示函数类型的参数和返回值类型，此时 `=>` 仅仅用来定义一个函数类型而不用实现这个函数。

```typescript
type Adder = (a: number, b: number) => number
const add: Adder = (a, b) => a + b
```

### 参数类型

#### 可选参数和默认参数

```typescript
function log(x?: string) {
  return x
}

// 使用可选参数的函数与使用了联合类型的函数不等价
function log1(x: string | undefined) {
  return x
}
log()
log1() // ts(2554) Expected 1 arguments, bug got 0
```

可选参数表示可以缺省、可以不传，但使用了联合类型的函数不可缺省，必须是特定类型或 undefined。

默认参数必须是参数类型的子类型。

#### 剩余参数

```typescript
function sum(...nums: number[]) {
  return nums.reduce((pre, cur) => pre + cur, 0)
}

// 使用联合类型兼容 string
function sum2(...nums: (number | string)[]): number {
  return nums.reduce<number>((pre, cur) => pre + Number(cur), 0)
}
sum2(1, '2', 3)
// 6
```

### this

TypeScript 在严格模式下，必须指定 this 的类型。

```typescript
interface Person {
  name: string
  say(this: Person): void
}
```

### 函数重载

TypeScript 中同一个函数可以根据不同类型的参数与返回值，实现函数的多态。

### 类型谓词 is

应用场景：实现自定义类型守卫

```typescript
function isString(s): s is string {
  return typeof s === 'string'
}
function isNumber(n: number) {
  return typeof n === 'number'
}
function operator(x: unknown) {
  if (isString(x)) {} // x 类型缩小为 string
  if (isNumber(x)) {} // ts(2345) unkonwn 不能赋值给 number
}
```

## 类类型

### 类

```typescript
class Dog {
  name: string
  constructor(name: string) {
    this.name = name
  }

  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog('Q')
dog.bark()
// => 'Woof! Woof!'
```

## 接口类型与类型别名

### interface 接口类型

```typescript
/** 关键字 接口名称 */
interface ProgramLanguage {
  /** 语言名称 */
  name: string
  /** 使用年限 */
  age: () => number
}

let TypeScript: ProgramLanguage

TypeScript = {
  name: 'TypeScript',
  age: () => new Date().getFullYear() - 2012
}
```

- 可缺省属性

```typescript
/** 关键字 接口名称 */
interface OptionalProgramLanguage {
  /** 语言名称 */
  name: string
  /** 使用年限 */
  age?: () => number
}

let OptionalTypeScript: OptionalProgramLanguage = {
  name: 'TypeScript'
} // ok
```

- 只读属性

```typescript
interface ReadOnlyProgramLanguage {
  readonly name: string
  readonly age: (() => number) | undefined
}

let ReadOnlyTypeScript: ReadOnlyProgramLanguage = {
  name: 'TypeScript',
  age: undefined,
}

ReadOnlyTypeScript.name = 'JavaScript' // ts(2540)错误，name 只读
```

这是静态类型层面的只读，实际上并不能阻止对对象的篡改。转译为 JavaScript 之后，readonly 修饰符会被抹除。

- 定义函数类型

```typescript
/** 关键字 接口名称 */
interface ProgramLanguage {
  /** 语言名称 */
  name: string
  /** 使用年限 */
  age: () => number
}

// 接口类型
interface StudyLanguage {
  (language: ProgramLanguage): void
}

let StudyInterface: StudyLanguage = language => console.log(`${language.name} ${language.age()}`)

/** 一般使用 内联类型或类型别名，配合箭头函数愈发来定义函数类型 */
type StudyLanguageType = (language: ProgramLanguage) => void
```

- 索引签名

索引名称的类型分为 string 和 number 两种。

```typescript
interface LanguageRankInterface {
    [rank: number]: string
}

interface LanguageYearInterface {
    [name: string]: number
}

let LanguageRankMap: LanguageRankInterface = {
  1: 'TypeScript',
  2: 'JavaScript',
  'WrongIndex': '2012', // ts(2322) 不存在的属性名
}

let LanguageMap: LanguageYearInterface = {
  TypeScript: 2012,
  JavaScript: 1995,
  1: 1970, // 数字作为索引时，可以兼容数字，也可以兼容字符串
}
```

- 继承与实现

接口类型可以继承与被继承

1. 使用 extends 关键字
```typescript
/** 关键字 接口名称 */
interface ProgramLanguage {
  /** 语言名称 */
  name: string
  /** 使用年限 */
  age: () => number
}

interface DynamicLanguage extends ProgramLanguage {
  rank: number // 定义新属性
}

interface TypeSafeLanguage extends ProgramLanguage {
  typeChecker: string // 定义新属性
}

// 继承多个
interface TypeScriptLanguage extends DynamicLanguage, TypeSafeLanguage {
  name: 'TypeScript' // 用原属性类型的兼容的类型(子集)重新定义属性
}
```

- Type 类型别名

```typescript
type LanguageType = {
  name: string
  age: () => number
}
```

- interface 与 Type 的区别

interface 接口类型重复定义，属性会累加

```typescript
interface Language {
  id: number
}
interface Language {
  name: string
}

let lang: Language = {
  id: 1,
  name: 'name',
}
```

类型别名 不能重复定义

## 高级类型：联合类型和交叉类型

### 联合类型

Unions 联合类型 表示变量、参数的类型不是单一原子类型，可能是多种不用的类型的组合。

表示方法：通过`|`操作符分隔类型的语法

```typescript
function formatPX(size: number | string) {
  if (typeof size === 'number') {
    return `${size}px`
  }
  if (typeof size === 'string') {
    return `${parseInt(size) || 0}px`
  }
  throw Error(` 仅支持 number 或者 string`)
}

formatPX(13)
formatPX('13px')
formatPX(true) // ts(2345) 'true' 类型不能赋予 'number | string' 类型
formatPX(null) // ts(2345) 'true' 类型不能赋予 'number | string' 类型
```

```typescript
interface Bird {
  fly(): void
  layEggs(): void
}

interface Fish {
  swim(): void
  layEggs(): void
}

const getPet: () => Bird | Fish = () => {
  return {
   // ...
  } as Bird | Fish
}
const Pet = getPet()
Pet.layEggs() // ok
Pet.fly() // ts(2339) 'Fish' 没有 'fly' 属性 'Bird | Fish' 没有 'fly' 属性

// 类型守卫
if ('fly' in Pet) {
  Pet.fly() // ok
}
```

### 交叉类型

`&` 表示交叉类型

```typescript
type Useless = string & number
```

### 合并接口类型

```typescript
type IntersectionType = { id: number name: string } & { age: number }

const mixed: IntersectionType = {
  id: 1,
  name: 'name',
  age: 18
}
```

如果合并的多个接口类型存在同名属性，那么该属性的类型为 多个属性的交叉类型

### 合并联合类型

合并联合类型为一个交叉类型，可以理解为求交集

```typescript
type UnionA = 'px' | 'em' | 'rem' | '%'
type UnionB = 'vh' | 'em' | 'rem' | 'pt'
type IntersectionUnion = UnionA & UnionB
const intersectionA: IntersectionUnion = 'em' // ok
const intersectionB: IntersectionUnion = 'rem' // ok
const intersectionC: IntersectionUnion = 'px' // ts(2322)
const intersectionD: IntersectionUnion = 'pt' // ts(2322)
```

如果多个联合类型中没有相同的类型成员，交叉出来的类型就是 never。

### 联合、交叉组合

联合操作符`|`的优先级低于交叉操作符`&`

```typescript
type UnionIntersectionC = ({ id: number; } & { name: string; } | { id: string; }) & { name: number; };
type UnionIntersectionD = { id: number; } & { name: string; } & { name: number; } | { id: string; } & { name: number; }; // 满足分配率
type UnionIntersectionE = ({ id: string; } | { id: number; } & { name: string; }) & { name: number; }; // 满足交换律
```
