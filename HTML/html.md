#### 1.如何理解html语义化 
参考：https://juejin.cn/post/7061588533214969892#heading-26
```
- 让人更容易读懂（增加代码可读性）

- 让搜索引擎更容易读懂，有助于爬虫抓取更多的有效信息，爬虫依赖于标签来确定上下文个各个关键字的权重（SEO）

- 在没有css样式下页面也能够呈现出很好的内容结构、代码结构
```

#### 2.水平垂直居中多种实现方式
Flex 布局教程：语法篇 https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
```
1.绝对定位（还有配合margin）
.j-full-center{position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%);}

flex垂直居中
.j-flex{display: flex;justify-content: center;align-items: center;}
 
flex + margin(子元素设置)
.flex{display: flex;}

flex多行垂直居中
.j-v-c{display: flex;flex-direction: column;justify-content: center;align-items: center;}
/* .j-v-c{display: flex;flex-wrap: wrap; justify-content: center;align-content: center;} */

table-cell + vertical-align  inline-block/margin: auto(子元素设置)
.j-table{display: table-cell;text-align: center;vertical-align: middle;}
```


#### BFC 
BFC 的特性：
```
- BFC 内部的块级盒会在垂直方向上一个接一个排列 ①

- 同一个 BFC 下的相邻块级元素可能发生外边距折叠，创建新的 BFC 可以避免的外边距折叠 ②

- 每个元素的外边距盒（margin box）的左边与包含块边框盒（border box）的左边相接触（从右向左的格式化，则相反），即使存在浮动也是如此 ③

- 浮动盒的区域不会和 BFC 重叠 ④

- 计算 BFC 的高度时，浮动元素也会参与计算 ⑤
```

以下元素会创建 BFC：
```
- 根元素（<html>）

- 浮动元素（float 不为 none）

- 绝对定位元素（position 为 absolute 或 fixed）

- 表格的标题和单元格（display 为 table-caption，table-cell）

- 匿名表格单元格元素（display 为 table 或 inline-table）

- 行内块元素（display 为 inline-block）

- overflow 的值不为 visible 的元素

- 弹性元素（display 为 flex 或 inline-flex 的元素的直接子元素）

- 网格元素（display 为 grid 或 inline-grid 的元素的直接子元素）

```

BFC使用：
``` 
- 水平的margin永远不会重叠。

- 设置了overflow属性（visible除外）的元素和它的子元素之间的margin不会重叠。

- 设置了绝对定位（position:absolute;）的盒模型，垂直margin不会重叠，和子元素之间也不会重叠。

- 设置了display：inline-block的元素，垂直的margin不会重叠，和子元素之间也不会重叠。

- 根元素（如html）与body的margin不会重叠。

```



