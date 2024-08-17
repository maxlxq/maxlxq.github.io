
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

单个字面量类型并没有太大的用处，将多个字面量类型组合成一个联合类型，用来描述拥有明确成员的使用的集合。

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

可以使用类似定义箭头函数的语法来表示函数类型的参数和返回值类型，此时 `=>` 仅仅用来定义一个函数类型而不用实现这个函数。

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

/** 一般使用 内联类型或类型别名，配合箭头函数语法来定义函数类型 */
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
type IntersectionType = { id: number, name: string } & { age: number }

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

### 类型缩减

如果将 string 原始类型和 string 字面量类型 组合成联合类型，就会类型缩减为 string。

```typescript
type URStr = 'string' | string; // string
type URNum = 2 | number; // number
type URBoolean = true | boolean; // boolean
enum EnumUR {
  ONE,
  TWO
}
type URE = EnumUR.ONE | EnumUR; // EnumUR
```

类型缩减削弱了 IDE 自动提示的能力。需要给父类型添加 `& {}`, 来控制缩减。

## 枚举类型: 7种用法

```typescript
type Day = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY'
const SUNDAY: Day = 'SUNDAY'
const SATURDAY: Day = 'SATURDAY'
```

### 枚举类型 Enums

使用 enum 关键字定义枚举类型： enum + 枚举名字 + 一对花括号。

```typescript
enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}
```

7种常见的枚举类型：数字类型、字符串类型、异构类型、常量成员和计算成员、枚举成员类型和联合枚举、常量枚举、外部枚举。

### 数字枚举

仅指定常量命名的情况下，默认从 0 开始递增的数字集合，称之为数字枚举。

从其他值开始递增，需要设置指定成员的初始值。

```typescript
enum Day {
  SUNDAY = 1, // 这里指定了从 1 开始递增
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}
```

### 字符串枚举

```typescript
enum Day {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY'
}
```

### 异构枚举

异构枚举：TypeScript 支持枚举类型同时拥有数字和字符类型的成员

异构枚举被认为是很鸡肋的类型。

枚举成员可以是数字、字符串这样的常量，也可以是通过表达式计算出来的值

### 常量成员和计算成员

常量成员：枚举成员的值都是 字符串、数字字面量、未指定初始值从 0 递增数字常量；在转移时，通过被计算的常量枚举表达式（转译阶段可计算值的表达式）定义值的成员。

计算成员：转译阶段之后才能计算值的表达式

### 枚举成员类型和联合枚举

对于不需要计算的常量类型成员，即缺省值、数字字面量、字符串字面量，被称为字面量枚举类型

枚举成员和枚举类型之间的关系分两种情况： 如果枚举的成员同时包含字面量和非字面量枚举值，枚举成员的类型就是枚举本身（枚举类型本身也是本身的子类型）；如果枚举成员全部是字面量枚举值，则所有枚举成员既是值又是类型。

```typescript
enum Day {
  SUNDAY,
  MONDAY,
}
enum MyDay {
  SUNDAY,
  MONDAY = Day.MONDAY
}

const mondayIsDay: Day.MONDAY = Day.MONDAY; // ok: 字面量枚举成员既是值，也是类型
const mondayIsSunday = MyDay.SUNDAY; // ok: 类型是 MyDay，MyDay.SUNDAY 仅仅是值
const mondayIsMyDay2: MyDay.MONDAY = MyDay.MONDAY; // ts(2535)，MyDay 包含非字面量值成员，所以 MyDay.MONDAY 不能作为类型
```
这里因为 Day 的所有成员都是字面量枚举成员，所以 Day.MONDAY 可以同时作为值和类型使用。但是 MyDay 的成员 MONDAY 是非字面量枚举成员（但是是常量枚举成员），所以 MyDay.MONDAY 仅能作为值使用.

如果枚举仅有一个成员且是字面量成员，那么这个成员的类型等于枚举类型

### 常量枚举

通过添加 const 修饰符定义常量枚举，常量枚举定义转译为 JavaScript 之后会被移除，并在使用常量枚举成员的地方被替换为相应的内联值，因此常量枚举的成员都必须是常量成员（字面量 + 转译阶段可计算值的表达式）

### 外部枚举

通过 declare 描述一个在其他地方已经定义过的变量。

```typescript
declare let $: any;

$('#id').addClass('show');
```

外部枚举和常规枚举的差异在于以下几点：
- 在外部枚举中，如果没有指定初始值的成员都被当作计算（值）成员，这跟常规枚举恰好相反；
- 即便外部枚举只包含字面量成员，这些成员的类型也不会是字面量成员类型，自然完全不具备字面量类型的各种特性。

外部枚举的作用在于为两个不同枚举（实际上是指向了同一个枚举类型）的成员进行兼容、比较、被复用提供了一种途径，这在一定程度上提升了枚举的可用性，让其显得不那么“鸡肋”。

## 泛型：如何正确使用泛型约束类型变量

### 泛型是什么？

泛型指的是类型参数化，将原来某种具体的类型进行参数化。

### 泛型类型参数

泛型最常用的场景：用来约束函数参数的类型。

```typescript
function useState<S>(state: S, initialValue?: S) {
  return [state, (s: S) => void 0] as unknown as [S, (s: S) => void];
}
```

### 泛型类

在类的定义中，我们还可以使用泛型用来约束构造函数、属性、方法的类型。

对于 React 开发者而言，组件也支持泛型。

### 泛型类型

在 TypeScript 中，类型本身就可以被定义为拥有不明确的类型参数的泛型，并且可以接收明确类型作为入参，从而衍生出更具体的类型。

```typescript
const reflectFn: <P>(param: P) => P = reflect; // ok
```

```typescript
type GenericReflectFunction<P> = (param: P) => P;
interface IGenericReflectFunction<P> {
  (param: P): P;
}

const reflectFn4: GenericReflectFunction<string> = reflect; // 具象化泛型
const reflectFn5: IGenericReflectFunction<number> = reflect; // 具象化泛型
const reflectFn3Return = reflectFn4('string'); // 入参和返回值都必须是 string 类型
const reflectFn4Return = reflectFn5(1); //  入参和返回值都必须是 number 类型
```

在泛型定义中，可以使用一些类型操作符进行运算表达，使得泛型可以根据入参的类型衍生出各异的类型

```typescript
type StringOrNumberArray<E> = E extends string | number ? E[] : E;
type StringArray = StringOrNumberArray<string>; // 类型是 string[]
type NumberArray = StringOrNumberArray<number>; // 类型是 number[]
type NeverGot = StringOrNumberArray<boolean>; // 类型是 boolean
```

这里定义了一个泛型，如果入参是 number | string 就会生成一个数组类型，否则就生成入参类型。

如果给这个泛型传入一个 string | boolean 联合类型作为入参

```typescript
type StringOrNumberArray<E> = E extends string | number ? E[] : E;
type BooleanOrString = string | boolean;
type WhatIsThis = StringOrNumberArray<BooleanOrString>; // 好像应该是 string | boolean ?
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | boolean
```

WhatIsThis 并非想象中的 boolean | string, 而是 boolean | string[]。

涉及到的原因是 分配条件类型。

分配条件类型：在条件类型判断的情况下，如果入参是联合类型，则会被拆解成一个个独立的类型进行类型运算。

上边示例中的 string | boolean 入参，先被拆解成 string 和 boolean 这两个独立类型，再分别判断是否是 string | number 类型的子集。因为 string 是子集而 boolean 不是，所以最终我们得到的 WhatIsThis 的类型是 boolean | string[]。

> 注意：枚举类型不支持泛型。

### 泛型约束

把泛型入参限定在一个相对更明确的集合内，以便对入参进行约束。

把接受参数的类型限定在几种原始类型的集合中，就可以使用 "泛型入参名 extends 类型"。

把接口泛型入参约束在特定范围内，"泛型入参名 extends `{ id: number; name: string }`"。
此时泛型仅接受 `{ id: number; name: string }` 接口类型的子类型作为入参。

在多个不同的泛型入参之间设置约束关系。

```typescript
interface ObjSetter {
  <O extends {}, K extends keyof O, V extends O[K]>(obj: O, key: K, value: V): V;
}

const setValueOfObj: ObjSetter = (obj, key, value) => (obj[key] = value);

setValueOfObj({ id: 1, name: 'name' }, 'id', 2); // ok
setValueOfObj({ id: 1, name: 'name' }, 'name', 'new name'); // ok
setValueOfObj({ id: 1, name: 'name' }, 'age', 2); // ts(2345)
setValueOfObj({ id: 1, name: 'name' }, 'id', '2'); // ts(2345)
```

泛型入参的约束与默认值还可以组合使用

```typescript
interface ReduxModelMixed<State extends {} = { id: number; name: string }> {
  state: State
}
```
