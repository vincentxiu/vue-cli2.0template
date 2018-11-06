# 前端代码规范 ---- javascript
>本文档的目标是使 JavaScript 代码风格保持一致，容易被理解和被维护。

可以修改开发工具的配置文件并设置格式化快捷键来统一代码风格

代码必须注释清楚

### 基本命名规范
1、变量、函数名以驼峰式命名，应为名词，具体含义
```js
let newName
function getName() {}
```
2、常量全部大写字母，用_连接
```js
const THEME_SKIN = 'theme-skin'
```
3、函数名以动词开始
```js
function getName() {} // 获取
function setName() {} // 设置
function doName() {} // 执行
function submitName() {} // 提交
function editName() {} // 编辑
```
4、返回类型是布尔类型，一般以is开头
```js
let isEnable = false
function isCheckName() {}
```
5、变量和函数命名，不要担心长度，合乎逻辑重要。

6、class以名词命名，首字母大写

7、文件名、目录名称命名方式 用 - 连接 


### 注释

1、单行注释 &nbsp; 必须独占一行。// 后跟一个空格，缩进与下一行被注释说明的代码一致。// 

2、多行注释 &nbsp; 避免使用 /*...*/ 这样的多行注释。有多行注释内容时，使用多个单行注释。// 

3、文档化注释 &nbsp; 为了便于代码阅读和维护，以下内容必须包含以 /**...*/ 形式的块注释中。

4、关于函数JSDoc注释  适用.vue文件 (wacth、methods、computed)

- [JSDoc官方文档http://usejsdoc.org/](http://usejsdoc.org/)

演示一下jsdoc的标准写法：

```js
/**
 * 解释这个function的作用，可以把处理的思路写下来
 * @param  {Array} param1 - 参数param1的解释
 * @param  {Object} param2 - 参数param2的解释
 * @param  {number} param3 - 参数param3的解释
 * @return {string} 对返回值的解释，如果没有返回值，则不需要添加这一项
 */
function jsdocExample(param1, param2, param3) {
  // ...
  return ''
}
```

### 代码风格
**缩进 使用2个空格(不要使用Tab)**

**忽略分号(不加)**(VUE项目里不加，其他的项目需要加)

**空格**

1、 [强制] 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格。
```js
var a = !arr.length
a++
a = b + c
```
2、[强制] 用作代码块起始的左花括号 { 前必须有一个空格。
```js
// good
if(condition) {}
while(condition) {}
function funcName() {}

// bad
if(condition){}
while (condition){}
function funcName(){}
```
3、[强制] if / else / for / while / function / switch / do / try / catch / finally 关键字后，必须有一个空格。
```js
// good
if (condition) {}
while (condition) {}
(function () {
})();

// bad
if(condition) {}
while(condition) {}
(function() {
})();
```
4、[强制] 在对象创建时，属性中的 : 之后必须有空格，: 之前不允许有空格。
```js
// good
var obj = {
    a: 1,
    b: 2,
    c: 3,
};
// bad
var obj = {
    a : 1,
    b:2,
    c :3
};

```
5、[强制] 函数声明、具名函数表达式、函数调用中，函数名和 ( 之间不允许有空格。
```js
// good
function funcName() {}
var funcName = function funcName() {}
funcName()

// bad
function funcName () {}
var funcName = function funcName () {}
funcName ()
```
6、[强制] , 前不允许有空格
```js
// good
callFunc(a, b)

// bad
callFunc(a , b)
```
7、[强制] 在函数调用、函数声明、括号表达式、属性访问、if / for / while / switch / catch 等语句中，() 和 [] 内紧贴括号部分不允许有空格。
```js
// good

callFunc(param1, param2, param3);
save(this.list[this.indexes[i]]);
needIncream && (variable += increament);
if (num > list.length) {}
while (len--) {}


// bad
callFunc( param1, param2, param3 );
save( this.list[ this.indexes[ i ] ] );
needIncreament && ( variable += increament );
if ( num > list.length ) {}
while ( len-- ) {}
```
### 基于`eslint-plugin-standard`修改eslint规则

git钩子会强制验证eslint规则，通过后才能提交。后期新项目会在初始化的时候执行git钩子安装命令(必须执行)

eslint 提供 —fix 命令可以修复大部分的error 和warn

> (vue cli 可以忽略这个)

```

