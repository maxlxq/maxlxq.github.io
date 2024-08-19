# 网格布局

CSS 网格布局，擅长于将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系。

可以按行、列来对齐元素，在布局上，网格比表格更加灵活。

## 特点

- 固定的位置和弹性的轨道的大小：单位可以用：像素、百分比、fr
- 网格项摆放
- 创建额外的轨道来包含内容
- 对齐控制
- 控制重叠内容

## 网格容器

在元素上声明 `display: grid` 或 `display: inline-grid` 来创建一个网格容器。
这个容器元素的所有直系子元素都会变成网格项目。

## grid 属性介绍

grid 是一个 CSS 简写属性，可以用来设置以下属性：

- 显示网格属性 grid-template
  - grid-template-rows
  - grid-template-columns
  - grid-template-areas
- 隐式网格属性 grid-auto
  - grid-auto-rows
  - grid-auto-columns
  - grid-auto-flow
- 间距属性 grid-gap
  - grid-row-gap
  - grid-column-gap

## 网格轨道

grid-template-rows 和 grid-template-columns 属性 或 简写 grid 或 grid-template 属性，在显示网格中定义网格轨道。

### 基本示例

grid-template-columns 定义列轨道的大小。
如下，创建一个网格，包含三个 200像素宽的列轨道。

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

### fr 单位

轨道可以使用任何长度单位进行定义。fr 单位表示网格容器剩余空间的一部分。
如下，定义三个等宽的轨道，根据可用空间大小进行增减。
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

可以使用 repeat() 函数来重复轨道的定义。
如下，定义三个等宽的轨道。
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

如下，定义不同尺寸的轨道。
```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
```

多种尺寸单位可以混用。
如下，轨道1宽度100px，轨道二、三 根据剩余空间，分为2:1.
```css
.container {
  display: grid;
  grid-template-columns: 100px 2fr 1fr;
}
```

## 隐式网格

通过 grid-template-columns 属性专门定义了列轨道，但网格也会自定创建行。这些行是隐式网络的一部分。

用 grid-auto-rows 属性来确保在隐式网格中创建的轨道是 200 像素高。
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
}
```

## 轨道大小和minmax

通过 minmax() 函数，可以定义轨道的最小和最大尺寸。
如下，定义最小宽度为 200px，最大宽度为 300px；且自动创建的行高度最小100px，最大高度为自动，取决于最高单元格的空间。
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 300px));
  grid-auto-rows: minmax(100px, auto);
}
```

## 跨轨道放置网格项目

使用 grid-column-start、grid-column-end、grid-row-start、grid-row-end 属性。
- 代表的是 线，线是从 1 开始的。

将前两个项目放置在三列轨道网格上。从左到右，第一个项目放置在第 1 列，并跨越到第 4 列，在我们的示例中，第 4 列是网格的最右边一行。它开始于第 1 行，结束于第 3 行，因此跨越了两条行轨。

第二个项目从网格列第 1 行开始，跨越一个轨道。这是默认设置，因此我不需要指定终止行。它还跨越了从第 3 行到第 5 行的两条行轨道。其他项目将放置在网格的空白处。

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}

.box2 {
  grid-column-start: 1;
  grid-row-start: 3;
  grid-row-end: 5;
}
```

## 网格线定位简写

列，可以使用 grid-column 一行写完。

行，可以使用 grid-row 一行写完。

斜线字符 / 前面的值为起始网格线，后面的值为终止网格线。

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box1 {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.box2 {
  grid-column: 1;
  grid-row: 3 / 5;
}
```

- 网格单元：网格项中最小的单位。

- 网格区域：项目可以按行或列跨越一个或多个单元格，就形成了一个网格区域。

- 网格间距：网格单元格之间的横向间隔 或 纵向间隔 可以使用 column-gap 和 row-gap 属性来设置。

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 1em;
}
```

- 网格可以嵌套

- 重叠的项目可以用 z-index 来控制层级，默认后置元素层级高，在上面；设置 z-index 后，值大的在上面。

