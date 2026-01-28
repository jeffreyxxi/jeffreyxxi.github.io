---
prev:
  text: 面试总结
  link: /fe_lang/tests
next:
  text: CSS 笔记
  link: /fe_lang/css
---

## vue 笔记整理

### 源码阅读

- 为了方便，采取最简单的方式，从github获取Vue项目，构建后获取未压缩vue.js，然后直接在页面中引入vue.js，逐步debugger，了解vue到底替我们做了什么；

#### html代码

```
<html>
  <head>

  </head>
  <body>
    <div id="app">
      <input type="text" v-model="input" />
      <div>{{input}}</div>
    </div>
  </body>
  <script src="./../dist/vue.js"></script>
  <script src="./debug.js"></script>
</html>
```

#### debug.js 文档

```
new Vue({
  el:"#app",
  data(){
    return{
      input:""
    }
  },
  beforeCreate(){
    console.log("beforeCreated");
  },
  created(){
    console.log("created!");
  },
  beforeMount(){
    console.log("beforeMounted!");
  },
  mounted(){
    console.log("mounted!");
  },
  beforeUpdate(){
    console.log("beforeUpdate!");
  },
  updated(){
    console.log("updated!");
  },
  beforeDestory(){
    console.log("beforeDestory!");
  },
  destory(){
    console.log("destory!");
  }
});
```

#### vue.js 文件太长了，所以一步一步的写出来

```
(function (global, factory) {
  // 判断是否node环境
  typeof exports === 'object' && typeof module !=='undefined' ?
    module.exports = factory() :
    // 判断是否CommonJS
    typeof define === 'function' && define.amd ?
      define(factory) :
      // 如果都不是，直接把factory（）的结果，即Vue对象放在全局，即浏览器端的Window
      (global = global || self, global.Vue = factory());
}(this, function () {
  'use strict';
// Vue的具体实现过程，一万多行
}))
```

- 具体的一万多行中，一开始看定义了非常多的方法，根本不知道是干嘛的，不明白它做的事情的会记录一下，看不懂它的过程也会记录一下，简单的跳过；

```
var emptyObject = Object.freeze({});
// Object.freeze() 冻结对象，其他代码不能删除或更改任何属性
```
