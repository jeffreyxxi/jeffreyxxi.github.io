---
prev: /git
next: /vue
---

## javascript

### 泛型

- ts 是强类型,他的变量和方法都有类型的限制.但是当一个方法可能会有多个类型的返回值的时候,我们可以自己定义一个类型来表示他的返回值的类型,通常我们自己定义的这个类型,就是泛型;

### 闭包

- 函数及其周围状态的应用捆绑在一起构成闭包,闭包可以让内部函数访问外部函数作用域

```
// 最基础的闭包

function consoleName (){
    let name = "王二小";
    return function(){
        console.log(name);
    }
}

var outputName = consoleName();
outputName();   // "王二小"


// 基础闭包

function addFnFactory(x){
    return function(y){
        return x+y;
    }
}
var addBaseOn5 = addFnFactory(5);
var addBaseOn10 = addFnFactory(10);
addBaseOn5(2);    // 7
addBaseOn10(2);   // 12

// 闭包使用

var Counter = function(){
    var initNumber = 0;
    var numberChange = function(var){
        initNumber += var;
    }
    return {
        increment(){
            numberChange(1);
        }
        decrement(){
            numberChange(-1);
        }
        getValue(){
            return initNumber;
        }
    }
}
var counter1 = Counter();
var counter2 = Counter();
counter1.increment();
counter1.increment();
counter1.decrement();
counter1.getValue();
counter2.getValue();

```

### this 的指向问题

#### 全局环境下

- this 指向全局对象，即浏览器中指向 window，node 中指向 global

#### 函数环境下

- 函数内部，this 的取值范围取决于函数被调用的方式

- 简单调用，如果 this 值不是由调用设置的，则指向全局对象，严格模式下为 undefined；

- call(),apply()和 bind() 函数内时， 参考 [call(),apply(),bind()](/javascript.html#call-apply-bind)

- 在箭头函数中，this 与封闭词法环境的 this 保持一致。在全局代码中，它将被设置为全局对象。

- 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。

### let、var、const 的区别

- var 没有块级作用域，支持变量提升。
- let 有块级作用域，不支持变量提升。不允许重复声明，暂存性死区。不能通过 window.变量名进行访问.
- const 有块级作用域，不支持变量提升，不允许重复声明，暂存性死区。声明一个变量一旦声明就不能改变，改变报错。

### 变量提升

_**<span style="color:#F56C6C">作用域就是程序中定义变量的区域，该位置决定了变量的生命周期。通俗理解，作用域就是变量与函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期。</span>**_

- 变量提升是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的行为。变量被提升后，会给变量设置默认值为 undefined。
- 使用 var 声明变量,不管变量写在哪里,都会被提前到作用域的顶端,全局变量会被提升到全局作用域的顶端,函数内部的变量会被提升到函数作用域的顶端;
- 使用变量形式声明函数时，和普通的变量一样会存在提升的现象，而函数声明式会提升到作用域最前边，并且将声明内容一起提升到最上边。

```
fn()
var fn = function () {
 console.log(1)
}
// 输出结果：Uncaught TypeError: fn is not a function

foo()
function foo () {
 console.log(2)
}
// 输出结果：2

// 使用变量形式声明fn并在其前面执行时，会报错fn不是一个函数，因为此时fn只是一个变量，还没有赋值为一个函数，所以是不能执行fn方法的。
```

- [参考文章](https://zhuanlan.zhihu.com/p/438563024)

### js 的基本数据类型

- ECMAScript 标准定义了八种数据类型，分别是 String，Number，Boolean，Null，Undefined，Bigint，Symbol 和 Object. 前七个是原始类型,Object 是引用类型.
- Symbol 类型是全局唯一的并且是不可修改的, 并且也可以用来作为 Object 的 key 的值

### Fetch Api

#### `fetch()` 包含了 fetch() 方法，用于获取资源。

#### `Headers` 表示响应/请求的标头信息，允许你查询它们，或者针对不同的结果做不同的操作。

#### `Request` 相当于一个资源请求。

#### `Response` 相当于请求的响应

#### 语法

```
fetch(input, init)
// input: 一个字符串或一个Request对象
// init: 一个对象,包含的配置项有 method / headers / body / mode / credentials 等

// 返回值: 一个 Promise，resolve 时回传 Response 对象。

// Request 和 Response 也有很多配置项和方法,使用时直接new就可以

```

#### 特点: 基于 Promise,不需要依赖第三方库，就可以优雅地使用 AJAX

### 立即执行函数

```
(function(){alert(‘21’)})()
```

#### 作用:

- 创建一个独立的作用域。
- 这个作用域里面的变量，外面访问不到（即避免「变量污染」）

### 堆和栈

- 基本类型：基本类型在内存中分别占有固定大小的空间，他们的值保存在栈中，我们通过按值来访问的
- 引用类型: 引用类型指的是那些保存在堆内存中的对象，值的大小不固定。栈内存中存放地址，地址指向堆内存中的对象，是按引用访问的
- 栈(stack): 用于存放临时变量的一片内存块,后进先出;一般用于存储基本数据类型(string,boolean,number,undefined,null,bigint,symbol),特点是:

1. 基本数据类型占用空间小，操作简单，直接存储值本身。
2. 线性有序存储，容量小，系统分配效率高。
3. 当前执行环境结束就会被销毁被垃圾回收制回收。

```
let a = 20;
let b = a;
b = 30;
console.log(a); // 20
```

- 堆(heap): 一种经过排序的树形数据结构，每个结点都有一个值。堆的存取是随意。一般用于存储 Object,Array,Function 等出了基本数据类型的引用类型数据,特点是:

1. 引用数据类型占据空间大、大小不固定。
2. 引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体，因此效率较低。
3. 只有当指向堆内存的所有指针都被销毁后才能被回收机制回收。

```
let m = { a: 10, b: 20 };
let n = m;
n.a = 16;
console.log(m.a) // 16
```

- 深浅拷贝问题:
- 浅拷贝: 浅拷贝是会将对象的每个属性进行依次复制，但是当对象的属性值是引用类型时，实质复制的是其引用，当引用指向的值改变时也会跟着变化。
- 深拷贝: 深拷贝复制变量值，对于非基本类型的变量，则递归至基本类型变量后，再复制。 深拷贝后的对象与原来的对象是完全隔离的，互不影响，对一个对象的修改并不会影响另一个对象。

```
// 数组深拷贝,使用多层嵌套循环复制值
function typeIs(obj){
  let typeString = typeof obj;
  if(typeof obj !== 'object'){
    return typeof obj;
  }else{
    if(obj === null){
      return 'null';
    } else if(obj instanceof Date){// 时间类型
      return 'date';
    }else if(obj instanceof RegExp){
      return 'regexp';
    }else if(Array.isArray(obj)){
      return 'array';
    }else{
      return 'object'
    }
  }
}
functon clone(obj){
  // 判断类型
  if(typeIs(obj) === 'array'){
    let result = []
    obj.forEach(item=>{
      if((typeIs(obj) === 'object' || typeIs(obj) === 'array')){
        result.push(clone(item))
      }else{
        result.push(item)
      }
    })
    return result
  } else if (typeIs(obj) === 'object'){
    let result = {}
    Object.keys(obj).forEach(item=>{
      if((typeIs(obj) === 'object' || typeIs(obj) === 'array')){
        result[item] = clone(obj[item])
      }else{
        result[item] = obj[item]
      }
    })
    return result
  } else{
    return obj;
  }
}

// 独享深拷贝,可以直接使用JSON.parse(JSON.stringify()),但是这种方法处理不了RegExp,Date,null
```

### 执行机制/事件循环/任务/队列

- 执行机制: javascript 是单线程语言,从前到后一行一行一次执行,报错则停止执行,先执行同步代码在执行异步代码;首先任务分为同步任务和异步任务,同步任务直接进入主线程进行排队,异步任务进入任务队列进行排队;同步任务是在主线程的执行栈中执行的,只有主线程的执行栈被清空的时候,才会执行任务队列中的任务;
- 任务队列: 是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。是一个事件的队列（也可以理解成消息的队列），IO 设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。除了 IO 设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列”，等待主线程读取。
- 宏任务微任务和事件循环: 异步任务分为宏任务和微任务;宏任务进入宏任务队列进行排队,微任务进入微任务队列进行排队;宏任务队列可以有多个,微任务队列只有一个;当一个宏任务队列执行完后,会检查微任务队列中是否有可执行的微任务,如有则先依次执行所有微任务,如无则继续执行下一个宏任务队列;
- 常见宏任务（宿主发起）: setTimeout、setInterval、script、UI 交互、I/O、postMessage
- 常见微任务(JS 引擎发起)：Promise().then(), Promise.nextTick()

### 简易版的 VUE 双向绑定

- html 代码

```
<!DOCTYPE html>
<html lang="en-US">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>VUE2 Demo</title>
  <meta name="generator" content="VuePress 1.8.2">

  <meta name="description" content="notes of jeffrey">

</head>

<body>
  <div id="app"><input type="text" v-model="text" />{{text}}</div>
  <script src="./vue.js" defer></script>
  <script src="./index.js" defer></script>
</body>

</html>
```

- index.js 代码

```
var instance = new Vue({
  el: "app",
  data: {
    text: "123"
  }
})
```

- vue 代码

```
function Dep(){
  this.subs = []
}
Dep.prototype = {
  addSubs(sub){
    this.subs.push(sub)
  },
  notify(){
    this.subs.forEach(item=>{
      item.update()
    })
  }
}
function Watcher(instance, node, name){
  Dep.target  = this
  this.vm = instance
  this.node = node
  this.name = name
  this.update()
  Dep.target = null
}
Watcher.prototype = {
  update(){
    this.get()
    if (this.node.nodeType === 1) {
      this.node.value = this.value
    }
    if (this.node.nodeType === 3) {
      this.node.nodeValue = this.value
    }
  },
  get(){
    this.value = this.vm[this.name]
  }
}
function defineReactive(instance, key, value){
  let dep = new Dep()
  Object.defineProperty(instance, key, {
    get: function(){
      if (Dep.target) {
        dep.addSubs(Dep.target)
      }
      return value
    },
    set: function(val){
      if (val === value) {
        return
      }
      value = val
      dep.notify()
    }
  })
}
function observe(obj, instance){
  for (let key of Object.keys(obj)) {
    defineReactive(instance, key, obj[key])
  }
}
function compile(dom, instance){
  let reg = /\{\{(.*)\}\}/
  if (dom.nodeType === 1) {
    let attr = dom.attributes;
    for (let i = 0; i < attr.length; i++) {
      if (attr[i].nodeName === 'v-model') {
        let name = attr[i].nodeValue
        dom.addEventListener("input", function(e){
          instance[name] = e.target.value
        })
        dom.value = instance[name]
        new Watcher(instance, dom, name)
        dom.removeAttribute('v-model')
      }
    }
  }
  if (dom.nodeType === 3) {
    if (reg.test(dom.nodeValue)) {
      let name = RegExp.$1
      name = name.trim()
      dom.nodeValue = instance[name]
      new Watcher(instance, dom, name)
    }
  }
}
function nodeToFragment(dom, instance){
  let fragment = document.createDocumentFragment()
  let child;
  while(child = dom.firstChild){
    compile(child, instance)
    fragment.appendChild(child)
  }
  return fragment
}
function Vue(options){
  this.data = options.data
  this.el = options.el
  observe(this.data, this)
  let dom = nodeToFragment(document.getElementById(this.el),this)
  document.getElementById(this.el).appendChild(dom)
}
```

## git

### 常见工作流的形式

集中式工作流：只有 master 分支

功能分支工作流：master 和功能分支，代码直接 push 进 master

Git Flow 工作流：大型项目必备

- master 储存正式发布版本历史，dev 是功能集成分支，方便 master 分支每个提交都打 TAG
- 功能分支以 dev 为父分支，代码 push 到 dev，不直接推到 master

Forking 工作流: Forking 工作流要先有一个公开的正式仓库存储在服务器上。但一个新的开发者想要在项目上工作时，不是直接从正式仓库克隆，而是 fork 正式项目在服务器上创建一个拷贝

Pull Requests 工作流: 先创建分支 branch，在此分支上完成功能之后，经过严格测试，再 pull request，审核代码人员 merged，同意之后再将分支代码合并入 master

Github Flow 工作流和 Gitlab Flow 工作流本质上也是 Pull Request 工作流

## css

### css 的重绘和回流

- 重绘：当节点需要更改外观而不会影响布局。不影响元素周围或内部布局的属性，将只会引起浏览器的重绘;
- 回流：DOM 结构的修改引发或 DOM 几何尺寸变化的时候，发生回流。需重新计算渲染树，重新渲染;
- 常见的几何属性有 width、height、padding、margin、left、top、border 或者是 DOM 节点发生增减移动。
- 减少重绘和回流的办法:

1. 使用 css3 新增属性：translate 替代 top 等方向值。
2. 避免频繁使用 style，而是采用 class。

### 为什么不建议将 font-size 设置为 12px 以下？

#### 原因

1. font-size 有一个最小值 12px（不同操作系统、不同语言可能限制不一样），低于 12px 的，一律按 12px 显示。理由是 Chrome 认为低于 12px 对人类是不友好的。
2. 但是允许你把 font-size 设置为 0.
3. 这个 12px 的限制用户是可以自行调整的，进入 chrome://settings/fonts 设置，滚动到最下方你就可以调整 12px 为其他值。

#### 解决办法

1. Chrome 29 版本之前，你可以使用 `-webkit-text-size-adjust: none;` 来解除这个限制。29 版本后，就不能这样做了。
2. 你可以先设置 12px，然后使用 transform: scale(0.833333) 将元素缩小，效果跟 10px 很接近。不过要注意的是，transform: scale 出了缩小 font-size，也会缩小其他一些属性，需要多测试。

### 水平垂直同时居中的方式

```
// 方式一: 绝对定位
<div class="father">
  <div class="son">
    123123
  </div>
</div>

.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
// 方式二: flex/gird
<div class="father">
  <div class="son">
    123123
  </div>
</div>

.father {
  display: flex;
  justify-content: center;
  align-items: center;
}
// 方式三: table-cell + text-align
<div class="father">
  <div class="son">
    123123
  </div>
</div>

.father {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.son {
  display: inline-block;
}
// 方式四: line-height + text-align
<div class="father">
  <div class="son">
    123123
  </div>
</div>

.father {
  height: 200px;
  line-height: 200px;
  text-align: center;
}
```

## 综合问题

### https 的加密方式

#### 对称加密

- 对称加密: 一个密匙既可以加密又可以解密为对称加密,安全性差效率高
- 非对称加密: 两个密匙,一个公匙一个私匙,公匙加密只有私匙能解,私匙加密只有公匙能解,安全性高效率差
- 数字证书: 含有证书持有者信息、公钥信息,数字签名等
- 数字签名: CA 机构对证书明文数据 T 金行 hash,用私匙对 hash 进行加密,得到数字签名

* [https 的加密方式原理文章](https://zhuanlan.zhihu.com/p/43789231)

### 性能优化的方式

#### VUE 按需加载

- vue 中的懒加载是通过 webpack 的代码分割来实现的;

```
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```

#### 代码结构的优化

- 设置 Viewport：HTML 的 viewport 可加快页面的渲染。
- 减少 DOM 结点和 DOM 的层级,最多六层：DOM 结点太多会影响页面的渲染。层级太深一旦回流就可能需要大规模的重新渲染。可以提前把图片的宽高边距设置好，可以避免图片加载完成后引起尺寸变化导致回流；
- 优化高频事件: scroll/touchmove 等高频事件,尽可能的使用函数防抖节流

#### 加载优化(减少 http 请求数)

- 合并图片,一些不需要经常改变的可以试用精灵图雪碧图,来减少请求数
- 合并压缩样式表和脚本
- 首屏加载,先考虑首屏需要的加载,其余的可延后处理
- 静态资源存放在服务器并设置缓存
- 异步加载第三方资源

#### 图片优化

- 尽量使用 png 格式并压缩,体积较小
- 懒加载: 先将 img 标签中的 src 链接设为同一张图片（空白图片），将其真正的图片地址存储再 img 标签的自定义属性中（比如 data-src）。当 js 监听到该图片元素进入可视窗口时，即将自定义属性中的地址存储到 src 属性中，达到懒加载的效果。这样做能防止页面一次性向服务器响应大量请求导致服务器响应慢，页面卡顿或崩溃等问题
- 尽量少使用 DataURL,没有图像压缩算法,文件会变大,并且要解码后渲染,加载较慢

#### 使用 CDN

CDN：实现把内容从中心媒体服务器分发到边缘服务器的网络体系即内容分发网络，CDN 具有更低的网络延迟和丢包率，能够分配负载，节省带宽提高网站的性能，可以使用户就近取得所需内容，解决网络拥挤的状况，提高用户访问网站的响应速度。

如果安全性对你的网站很重要，就不要使用公共的 CDN，因为当你远程从 CDN 请求文件时，你的访问来源信息也被发送过去，一些远程的 js 文件可能被修改用来搜集你的用户或者系统信息，而当你使用 https 协议时，能选择的 CDN 就更加有限。

#### 开启 Gzip

- Gzip 即数据压缩，前端生产环境中将 js、css、图片等文件进行压缩，通过减少数据传输量减小传输时间，节省服务器网络带宽，提高前端性能。

#### 样式表和 JS 文件的优化

- 头部内联的样式和脚本会阻塞页面的渲染，一般我们会把 css 样式表文件放到文件的头部使用 link 引入，这样可以让 CSS 样式表尽早地完成下载。

- 对应 js 脚本文件，一般我们把脚本放在尾部并使用异步方式加载，这样可以尽最大限度的减少样式和脚本对页面的阻塞。

#### 减少不必要的 Cookie

- Cookie 存储在客户端，伴随着 HTTP 请求在浏览器和服务器之间传递，由于 cookie 在访问对应域名下的资源时都会通过 HTTP 请求发送到服务器，从而会影响加载速度，所以尽量减少不必要的 Cookie。

### 从浏览器地址栏输入网址，到网页彻底打开，中间过程

- URL输入
- DNS解析: 域名到IP地址的解析，顺序：浏览器缓存--> 操作系统缓存--> 本地host文件 --> 路由器缓存--> ISP DNS缓存 --> 顶级DNS服务器/根DNS服务器，这个.对应的就是根域名服务器，默认情况下所有的网址的最后一位都是.，既然是默认情况下，为了方便用户，通常都会省略，浏览器在请求DNS的时候会自动加上，所有网址真正的解析过程为: . -> .com -> google.com. -> www.google.com.。
- TCP连接: 三次握手四次挥手
- 发送HTTP请求
- 服务器处理请求
- 服务器响应请求
- 浏览器解析渲染页面
- 连接结束
