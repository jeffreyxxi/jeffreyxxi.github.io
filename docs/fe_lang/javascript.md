---
prev: /
next: ./dev_note
---

## 重学 Javescript

## 数据类型

- ECMAScript 标准定义了八种数据类型，分别是 String，Number，Boolean，Null，Undefined，Bigint，Symbol 和 Object

- 前七种是原始类型

### 数据类型 - Boolean 类型

- 布尔表示一个逻辑实体，可以有两个值：true 和 false。
- 布尔值是一种取值仅能为 真 或 假 的数据类型，它赋予了编程语言在逻辑表达真 或 假 的能力。

### 数据类型 - Null 类型

- Null 类型只有一个值： null。
- 值 null 特指对象的值未设置。在布尔运算中被认为是 false。
- 表示一个不存在或者无效 object 或者地址引用。

### 数据类型 - Undefined 类型

- 一个声明未定义的变量的初始值，或没有实际参数的形式参数。

### 数据类型 - Number 类型

- 根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值（-2 的 53 次方 - 2 的 53 次方）。
- 还有带有符号的值+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。
  要检查值是否大于或小于 +/-Infinity，你可以使用常量 Number.MAX_VALUE 和 Number.MIN_VALUE。
- 另外在 ECMAScript 6 中，你也可以通过 Number.isSafeInteger() 方法还有 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 来检查值是否在双精度浮点数的取值范围内。

### 数据类型 - BigInt 类型

- BigInt 类型是 JavaScript 中的一个基础的数值类型，可以用任意精度表示整数。使用 BigInt，您可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。
- BigInt 是通过在整数末尾附加 n 或调用构造函数来创建的。BigInt 不能与数字互换操作。否则，将抛出 TypeError。

### 数据类型 - String 类型

- JavaScript 的字符串类型用于表示文本数据。它是一组 16 位的无符号整数值的“元素”。在字符串中的每个元素占据了字符串的位置。第一个元素的索引为 0，下一个是索引 1，依此类推。字符串的长度是它的元素的数量。
- JavaScript 字符串是不可更改的。这意味着字符串一旦被创建，就不能被修改。但是，可以基于对原始字符串的操作来创建新的字符串。

### 数据类型 - Symbol 类型

- 类型是唯一的并且是不可修改的, 并且也可以用来作为 Object 的 key 的值
- 看不懂这个类型有啥用

### 数据类型 - Object 类型

- 一个 Javascript 对象就是键和值之间的映射。键是一个字符串（或者 Symbol） ，值可以是任意类型的值。函数是一个附带可被调用功能的常规对象。
- 包括 Date,Array,Typed Array,Maps,Sets,WeakMaps,WeakSets,Json。

## call(),apply(),bind()

- 了解这三个方法才能搞懂 this 的指向问题

### Function.prototype.call()

- call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```
var funcTestCall = function(p1,p2){
  return this.a + p1 + p2;
}
var objTestCall = {a:4}

console.log(funcTestCall.call(objTestCall,2,2))
// output:8
```

### Function.prototype.apply()

- apply() 方法调用一个具有给定 this 值的函数，以及作为一个数组（或类似数组对象）提供的参数。

```
var funcTestApply = function(p1,p2){
  return this.a + p1 + p2;
}
var objTestApply = {a:4}

console.log(funcTestApply.apply(objTestApply,[2,3]))
// output:9
```

\*call()和 apply() 方法都是穿一个对象进去给执行的方法当 this，唯一区别就是 call()方法把参数按照一个或多个的方式传入被 call()的方法，而 apply()方法是把参数放在一个数组里面传入被 apply()的方法；

### Function.prototype.bind()

- bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```
var funcTestBind = function(p1,p2){
  return this.a + p1 + p2;
}
var objTestBind = {a:3};

console.log(funcTestBind.bind(objTestBind,4,5));

// output:ƒ (p1,p2){
//  return this.a + p1 + p2;
// }
// =======================================================================================
// 注意！！！ 得出上述结果是因为bind()方法的返回值是一个原函数的拷贝，这个拷贝拥有指定的this值和初始参数
// =======================================================================================

funcTestBind.bind(objTestBind,4,5)();
// 12
```

- 当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg。

返回值：返回一个原函数的拷贝，这个拷贝拥有指定的 this 值和初始参数

用法实例：

- 创建绑定函数： 创建一个函数，这个函数不管怎么调用，都有同样的 this 值；

```
window.x = 9;
var obj = {
  x:81,
  getX:function(){return this.x;}
}
var notBoundFn = obj.getX;
var copyFn = obj.getX;
var BoundFn = copyFn.bind(obj);
notBoundFn();  // 9
copyFn();      // 9
BoundFn();     //81
```

- 创建偏函数：使一个函数拥有预设的初始参数。

```
function add (p1,p2){
  return p1 + p2;
}
var addBind = add.bind(null,20);
addBind(20); // 40

function laterBee(){
  console.log("bibibibibi~");
}
laterBee.prototype.bee = function(){
  window.setTimeout(this.declare.bind(this),100);
}
lateBee.prototype.declare = function(){
  console.log("declare")
};
var Bee = new laterBee();
Bee.bee();

```

- 在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或 global）对象。当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。

```
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法
```

### this 指向问题

#### 全局环境下

- this 指向全局对象，即浏览器中指向 window，node 中指向 global

#### 函数环境下

- 函数内部，this 的取值范围取决于函数被调用的方式

- 简单调用，如果 this 值不是由调用设置的，则指向全局对象，严格模式下为 undefined；

- call(),apply()和 bind() 函数内时， 参考 [call(),apply(),bind()](/javascript.html#call-apply-bind)

- 在箭头函数中，this 与封闭词法环境的 this 保持一致。在全局代码中，它将被设置为全局对象。

- 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。

## Boolean 对象

#### 语法

```
new Boolean([value]) // value 可选，用来初始化 Boolean 对象的值。
```

#### 描述

如果第一个参数不是布尔值，则会将其转换为布尔值。如果省略该参数，或者其值为 0、-0、null、false、NaN、undefined、或者空字符串（""），则生成的 Boolean 对象的值为 false。如果传入的参数是 DOM 对象 document.all，也会生成值为 false 的 Boolean 对象。任何其他的值，包括值为 "false" 的字符串和任何对象，都会创建一个值为 true 的 Boolean 对象。

#### 注意

注意不要将基本类型中的布尔值 true 和 false 与值为 true 和 false 的 Boolean 对象弄混了。任何不是 undefined 和 null 的对象，包括值为 false 的 Boolean 对象，直接用于条件语句时都会被当做 true 来对待。

**<span style="color:#F56C6C">不要在应该使用基本类型布尔值的地方使用 Boolean 对象！！！</span>**

## Object 对象

### Object - 描述

Object 构造函数创建一个对象包装器。对象是一种复合值:他将很多值聚合在一起。

- 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
- 数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。
- 存取描述符是由 getter 函数和 setter 函数所描述的属性。
- 一个描述符只能是这两者其中之一；不能同时是两者。

### Object - 构造函数的属性

- Object.length 值为 1

- Object.prototype 可以为所有 Object 类型的对象添加属性。

### Object - 对象创建

创建对象的方式:

- 直接使用字面量

```
var obj1 = {key1:"value1",key2:"value2"};

var obj4 = {
  key:1,
  get doubleKey(){
    return this.key * 2;
  },
  set doubleKey(v){
    this.key = v / 2;
  }
}
```

- new Object()

```
var obj2 = new Object({key1:"value1",key2:"value2"});

// ECMAScript 2015 也可以这么写
var a = 1; var b = "name is b"; var c = {};
var obj5 = {a,b,c};

var obj6 = {
  key:  1,
  fn1() {}
}
```

- 使用 Object.create()

```
var obj3 = Object.create({key1:"value1",key2:"value2"});
```

**<span style="color:#F56C6C">注意!使用 create 创建的新对象,一定要注意 数据描述符 和 存取描述符 的属性配置</span>**

### Object - 对象描述符的配置项

- 共享的配置项: configurable 和 enumerable

_configurable_ 表示对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改。默认为 false。
如果 configurable 属性设置为 false，则该属性被认为是“不可配置的”，并且没有属性可以被改变 _<span style="color:#F56C6C">（除了单向改变 writable 为 false）</span>_ 。
当属性不可配置时，不能在数据和访问器属性类型之间切换。但如果 writeable 为 true 时,该属性是仍然可以改变值<br/>

_enumerable_ 配置对象的属性是否会被枚举,当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。默认为 false。但如果使用直接赋值的方式创建对象的属性，则 enumerable 为 true;

- 数据描述符独有的配置项

_value_ 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。<br/>

_writable_ 当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。默认为 false。

- 存取描述符独有的配置项

_get_ 属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。默认为 undefined。<br/>

_set_ 属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined。

### Object.create()

- 语法

```
Object.create(proto, propertiesObject)
```

- 参数

_proto_ 新创建对象的原型对象。<br/>

_propertiesObject_ 可选。如果没有指定为 undefined，否则是要添加到新创建对象的属性。<br/>

**<span style="color:#F56C6C">注意!!! 添加的属性的描述符的配置项的默认值如果不配置的话,可能会影响对象的使用,比如不可以写不可枚举等.</span>**

```
var n = Object.create(
  {key:"123"},
  {key2:
    {
      writable:true,
      configurable:true,
      value: "hello"
    }
  }
)

// n => {key2:"hallo"}
// n.key => "123"
// JSON.stringify(n) => "{}"
```

- 返回值

一个新对象，带着指定的原型对象和属性。

### Object.assign()

- 描述

1. 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。<br/>
1. 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。<br/>
1. Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。<br>
1. 针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是（可枚举）属性值。假如源值是一个对象的引用，它仅仅会复制其引用值。<br/>

- 语法

```
Object.assign(target, ...sources)
```

- 参数

_target_ 目标对象。<br/>

_propertiesObject_ 源对象。<br/>

### Object.defineProperty()

- 描述

此方法会直接在一个对象上新建一个属性或者修改一个对象的现有属性,并返回此对象;

- 语法

```
Object.defineProperty(obj,prop,descriptors)
```

_obj_ 要修改的对象<br/>
_prop_ 要创建或者要修改的属性<br/>
_descriptors_ 被创建的属性或者被修改的现有属性的描述符属性<br/>

- 返回值

返回传入的对象,如果此方法对此对象进行了修改,则是返回修改后的对象;

- 需要注意的继承问题

1. 如果访问者的属性是被继承的，它的 get 和 set 方法会在子对象的属性被访问或者修改时被调用。如果这些方法用一个变量存值，该值会被所有对象共享。

```
function origin (){};
var realValue = 0;
var obj = Object.defineProperty(origin.prototype,"key",{
  get(){ return realValue; },
  set(v){ realValue = v; }
})

var a = new origin();
var b = new origin();

realValue = 3;

a.key // => 3
b.key // => 3
```

2. 在 get 和 set 方法中，this 指向某个被访问和修改属性的对象。所以上述问题可以通过存储在另一个属性中解决;

```
function origin (){};
var obj = Object.defineProperty(origin.prototype,"key",{
  get(){ return this._key; },
  set(v){ this._key = v; }
})

var a = new origin();
var b = new origin();

a.key = 3;

a.key // => 3
b.key // => undefine
```

3. 与上述描述的访问者属性不同的是，值属性始终在对象自身上设置，而不是一个原型。然而，如果一个不可写的属性被继承，它仍然可以防止修改对象的属性。

```
function origin (){};
origin.prototype.key_x = 1;
var obj = Object.defineProperty(origin.prototype,"key_y",{
 value:2,
 writable:false,
 enumberable:true,
})

var a = new origin();
a.key_x = 3;
a.key_y = 4;

a.key_x // => 3
a.key_y // => 2
```

### Object.defineProperties()

- 描述

Object.defineProperties() 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

- 语法

```
Object.defineProperties(obj,props)
```

- 参数

_obj_ 在其上定义或修改属性的对象。

_props_ 要添加或者要修改的属性的集合

```
var origin = {};

var n = Object.defineProperties(origin,{
  key_x:{configurable:true,enumberable:true,value:1,writable:true},
  key_y:{configurable:true,enumberable:true,get(){return this.key_x},set(v){this.key_x = v}}
})

```

### Object.entries()

- 描述

方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致

- 参数

_obj_ 可以返回其可枚举属性的键值对的对象。

```
Object.entries(obj);
```

- 常用写法以及注意事项

```
let obj = {key1:1,key2:"value2"}

let arr = Object.entries(obj); // arr => [["key1",1],["key2","value2"]]
```

_<span style="color:#F56C6C">注意~! 顺序不一样了!</span>_

```
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); // =>  [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]
```

```
// 如果是存取描述符
const myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // => [ ['foo', 'bar'] ]

// 如果是字符串
console.log(Object.entries('foo')); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

// 可以学习的写法
const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// 可以学习的写法
Object.entries(obj).forEach(([key, value]) => {
console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});

```

- 对象转 Map 对象

```
let obj = {key1:1,key2:"value2"}
let map = new Map(Object.entries(obj))
```

### Object.fromEntries()

- 描述

Object.fromEntries() 方法把键值对列表转换为一个对象。Object.fromEntries() 是 Object.entries 的反转。

- 语法和参数

```
Object.fromEntries(iterable);
```

_iterable_ 可以是数组或者 Map 对象或者其它实现了可迭代协议的对象。

- Map 转对象

```
let obj = {key1:1,key2:"value2"}
let map = new Map(Object.entries(obj))

let n = Object.fromEntries(map);
```

### Object.freeze()

- 描述

冻结一个对象; freeze()返回和传入的参数一样的值；

冻结：不能添加新的属性, 不能删除已有属性,不能修改已有属性的可枚举型、可配置性、可写性和已有属性的值，并且不能修改原型。

被冻结对象的所有属性都不可能以任何方式被修改，包括值，访问器属性。但如果一个属性的值是个对象，则这个对象的属性是可以修改（除非这个对象也是一个被冻结的对象）。

_<span style="color:#F56C6C">数组最为一种对象，被冻结后其元素不能被修改。</span>_

_<span style="color:#F56C6C">注意~! 如果对象的属性是对象,则作为属性的这个对象是可以被改变的,除非循环递归的在对象冻结之前,把作为属性的对象也冻结了</span>_

### Object.seal()

- 描述

Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。

- 参数和返回值

```
Object.seal(obj)
```

obj: 要被密封的对象, 返回被密封的对象

_<span style="color:#F56C6C">注意~! 不会影响从原型链上继承的属性</span>_

_<span style="color:#F56C6C">注意~! 使用 Object.freeze()冻结的对象中的现有属性值是不可变的。用 Object.seal()密封的对象可以改变其现有属性值。</span>_

### Object.isFrozen() && Object.isSeal()

- 描述

Object.isFrozen()方法判断一个对象是否被冻结。 一个对象是冻结的是指它不可扩展，所有属性都是不可配置的，且所有数据属性（即没有 getter 或 setter 组件的访问器的属性）都是不可写的。

Object.isSealed() 方法判断一个对象是否被密封。如果这个对象是密封的，则返回 true，否则返回 false。密封对象是指那些不可 扩展 的，且所有自身属性都不可配置且因此不可删除（但不一定是不可写）的对象。

一个不可扩展的空对象是一个冻结对象

一个冻结对象是一个密封对象

把一个对象的所有属性都改为不可配置就会变成一个冻结对象

一个不可扩展的空对象,是密封对象

### Object.is()

- 参数和返回值

```
Object.is(value1, value2);
```

value1: 被比较的第一个值。value2: 被比较的第二个值。

返回: 一个 Boolean 类型标示两个参数是否是同一个值。

Object.is() 方法判断两个值是否为同一个值。如果满足以下条件则两个值相等:

_都是 undefined_ <br/>
_都是 null_ <br/>
_都是 true 或 false_ <br/>
_都是相同长度的字符串且相同字符按相同顺序排列_ <br/>
_都是相同对象（意味着每个对象有同一个引用）_ <br/>
_都是数字且_ 或 _都是 +0_ 或 _都是 -0_ 或 _都是 NaN_ 或 _都是非零而且非 NaN 且为同一个值_

与== 运算不同。 == 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 "" == false 判断为 true), 而 Object.is 不会强制转换两边的值。

与=== 运算也不相同。 === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将 Number.NaN 与 NaN 视为不相等.

### Object.getOwnPropertyDescriptor()

- 描述

获取指定对象自有属性对应的属性描述符。可能会包含： value、writable、get、set、configurable、enumerable。

- 语法和参数

```
var ds = Object.getOwnPropertyDescriptor(obj, prop);

```

_obj_ 指定对象 ，_obj_ 指定属性

- 返回值

如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。

### Object.getOwnPropertyDescriptors()

- 描述

获取一个对象的所有自身属性的描述符。

- 语法和参数

```
var ds = Object.getOwnPropertyDescriptors(obj);

```

_obj_ 指定对象

- 返回值

指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

- 浅拷贝一个对象

Object.assign() 方法只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性们，而且访问器属性会被转换成数据属性，也无法拷贝源对象的原型，该方法配合 Object.create() 方法可以实现上面说的这些。

```
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

- 创建一个子类

```
function superclass() {}
superclass.prototype = {
  // 在这里定义方法和属性
};
function subclass() {}
subclass.prototype = Object.create(superclass.prototype, Object.getOwnPropertyDescriptors({
  // 在这里定义方法和属性
}));
```

### Object.getOwnPropertyNames()

- 描述

方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

如果你只要获取到可枚举属性，查看 Object.keys 或用 for...in 循环（还会获取到原型链上的可枚举属性，不过可以使用 hasOwnProperty()方法过滤掉）。

- 语法和参数

```
Object.getOwnPropertyNames(obj);

```

_obj_ 指定对象

- 返回值

在给定对象上找到的自身属性对应的字符串数组。

### Object.getOwnPropertySymbols()

- 描述

返回一个给定对象自身的所有 Symbol 属性的数组。

- 语法和参数

```
Object.getOwnPropertySymbols(obj);

```

_obj_ 指定对象

- 返回值

在给定对象自身上找到的所有 Symbol 属性的数组。

### Object.getPrototypeOf()

- 描述

返回指定对象的原型

- 语法和参数

```
Object.getPrototypeOf(obj);

```

_obj_ 要返回其原型的对象

- 返回值

返回给定对象的原型。如果没有继承属性，则返回 null。

**<span style="color:#F56C6C">Object.getPrototypeOf(Object) 不是 Object.prototype， JavaScript 中的 Object 是构造函数（创建对象的包装器）。</span>**

### Object.setPrototypeOf()

- 描述

方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。如果对象的[[Prototype]]被修改成不可扩展(通过 Object.isExtensible()查看)，就会抛出 TypeError 异常。如果 prototype 参数不是一个对象或者 null(例如，数字，字符串，boolean，或者 undefined)，则什么都不做。否则，该方法将 obj 的[[Prototype]]修改为新的值。

- 语法和参数

```
Object.setPrototypeOf(obj, prototype)

```

_obj_ 要设置其原型的对象。
_prototype_ 该对象的新原型。

### Object.hasOwnProperty()

- 描述

所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

- 语法和参数

```
Object.hasOwnProperty(prop);

```

_prop_ 要检测的属性的 String 字符串形式表示的名称，或者 Symbol。

- 返回值

用来判断某个对象是否含有指定的属性的布尔值 Boolean。

### Object.isExtensible()

- 描述

判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）。

- 语法和参数

```
Object.isExtensible(obj)

```

_obj_ 需要检测的对象

- 返回值

true/false

### Object.prototype.propertyIsEnumerable()

- 描述

返回一个布尔值，表示指定的属性是否可枚举。每个对象都有一个 propertyIsEnumerable 方法。此方法可以确定对象中指定的属性是否可以被 for...in 循环枚举，但是通过原型链继承的属性除外。如果对象没有指定的属性，则此方法返回 false。

- 语法和参数

```
obj.propertyIsEnumerable(prop)

```

_prop_ 需要测试的属性名。

- 返回值

true/false

### Object.keys()

- 描述

返回一个所有元素为字符串的数组，其元素来自于从给定的 object 上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。

- 语法和参数

```
Object.keys(obj)

```

_obj_ 要返回其枚举自身属性的对象。

- 返回值

一个表示给定对象的所有可枚举属性的字符串数组。

如果你想获取一个对象的所有属性,，甚至包括不可枚举的，则使用 Object.getOwnPropertyNames。

### Object.values()

- 描述

方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

- 语法和参数

```
Object.values(obj)

```

_obj_ 要返回其枚举自身属性值的对象。

- 返回值

一个包含对象自身的所有可枚举属性值的数组。

### Object.preventExtensions()

- 描述

让一个对象变的不可扩展，也就是永远不能再添加新的属性。

- 语法和参数

```
Object.preventExtensions(obj)

```

_obj_ 将要变得不可扩展的对象。

- 返回值

已经不可扩展的对象。

如果一个对象可以添加新的属性，则这个对象是可扩展的。Object.preventExtensions()将对象标记为不再可扩展，这样它将永远不会具有它被标记为不可扩展时持有的属性之外的属性。注意，一般来说，不可扩展对象的属性可能仍然可被删除。尝试将新属性添加到不可扩展对象将静默失败或抛出 TypeError。

Object.preventExtensions()仅阻止添加自身的属性。但其对象类型的原型依然可以添加新的属性。

该方法使得目标对象的 [[prototype]] 不可变；任何重新赋值 [[prototype]] 操作都会抛出 TypeError 。这种行为只针对内部的 [[prototype]] 属性， 目标对象的其它属性将保持可变。

一旦将对象变为不可扩展的对象，就再也不能使其可扩展。

### Object.prototype.valueOf()

- 描述

JavaScript 调用 valueOf 方法将对象转换为原始值。你很少需要自己调用 valueOf 方法；当遇到要预期的原始值的对象时，JavaScript 会自动调用它。

默认情况下，valueOf 方法由 Object 后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则 valueOf 将返回对象本身。

JavaScript 的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的 valueOf()方法的返回值和返回值类型均可能不同。

- 语法和参数

```
object.valueOf()

```

- 返回值

返回值为该对象的原始值。
