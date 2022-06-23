#### 1.数据类型
参考：https://juejin.cn/post/7061588533214969892#heading-26
ECMAScript标准规定了7种数据类型，其把这7种数据类型又分为两种：原始类型和对象类型。
```
- 基本数据类型
  Undefine、Null、String、Boolean、Number

- 原始类型：(在es10中加入了第七种原始类型BigInt，现已被最新Chrome支持)
  Null：只包含一个值：null
  Undefined：只包含一个值：undefined
  Boolean：包含两个值：true和false
  Number：整数或浮点数，还有一些特殊值（-Infinity、+Infinity、NaN）
  String：一串表示文本值的字符序列
  Symbol：一种实例是唯一且不可改变的数据类型

- 对象类型
  Object：自己分一类丝毫不过分，除了常用的Object，Array、Function等都属于特殊的对象
```
#### 2.隐式转换
ToPrimitive 参考：https://juejin.cn/post/6844903854882947080
>- 我们在对各种非Number类型运用数学运算符(- * /)时，会先将非Number类型转换为Number类型;
>- NaN和其他任何类型比较永远返回false(包括和他自己)。
>- Boolean和其他任何类型比较，Boolean首先被转换为Number类型。
>- String和Number比较，先将String转换为Number类型。
>- null == undefined比较结果是true，除此之外，null、undefined和其他任何结果的比较值都为false。
>- 当原始类型和引用类型做比较时，对象类型会依照ToPrimitive规则转换为原始类型

注意+是个例外，执行+操作符时：
```
1.当一侧为String类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。

2.当一侧为Number类型，另一侧为原始类型，则将原始类型转换为Number类型。

3.当一侧为Number类型，另一侧为引用类型，将引用类型和Number类型转换成字符串后拼接。

123 + '123' // 123123   （规则1）
123 + null  // 123    （规则2）
123 + true // 124    （规则2）
123 + {}  // 123[object Object]    （规则3）
```


#### 3.类型判断
typeof：能判断所有值类型，函数。不可对 null、对象、数组进行精确判断，因为都返回 object 。
```
console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function
// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
```

instanceof：能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型
```
class People {}
class Student extends People {}

const vortesnail = new Student();

console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true

其实现就是顺着原型链去找，如果能找到对应的 Xxxxx.prototype  即为 true 。比如这里的 vortesnail  作为实例，顺着原型链能找到 Student.prototype  及 People.prototype ，所以都为 true 。

```


Object.prototype.toString.call()：所有原始数据类型都是能判断的，还有 Error 对象，Date 对象等。
```
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
```