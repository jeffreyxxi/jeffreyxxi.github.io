<template><div><h2 id="vue-笔记整理" tabindex="-1"><a class="header-anchor" href="#vue-笔记整理"><span>vue 笔记整理</span></a></h2>
<h3 id="源码阅读" tabindex="-1"><a class="header-anchor" href="#源码阅读"><span>源码阅读</span></a></h3>
<ul>
<li>为了方便，采取最简单的方式，从github获取Vue项目，构建后获取未压缩vue.js，然后直接在页面中引入vue.js，逐步debugger，了解vue到底替我们做了什么；</li>
</ul>
<h4 id="html代码" tabindex="-1"><a class="header-anchor" href="#html代码"><span>html代码</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">&lt;html></span>
<span class="line">  &lt;head></span>
<span class="line">    </span>
<span class="line">  &lt;/head></span>
<span class="line">  &lt;body></span>
<span class="line">    &lt;div id="app"></span>
<span class="line">      &lt;input type="text" v-model="input" /></span>
<span class="line">      &lt;div>{{input}}&lt;/div></span>
<span class="line">    &lt;/div></span>
<span class="line">  &lt;/body></span>
<span class="line">  &lt;script src="./../dist/vue.js">&lt;/script></span>
<span class="line">  &lt;script src="./debug.js">&lt;/script></span>
<span class="line">&lt;/html></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="debug-js-文档" tabindex="-1"><a class="header-anchor" href="#debug-js-文档"><span>debug.js 文档</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">new Vue({</span>
<span class="line">  el:"#app",</span>
<span class="line">  data(){</span>
<span class="line">    return{</span>
<span class="line">      input:""</span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  beforeCreate(){</span>
<span class="line">    console.log("beforeCreated");</span>
<span class="line">  },</span>
<span class="line">  created(){</span>
<span class="line">    console.log("created!");</span>
<span class="line">  },</span>
<span class="line">  beforeMount(){</span>
<span class="line">    console.log("beforeMounted!");</span>
<span class="line">  },</span>
<span class="line">  mounted(){</span>
<span class="line">    console.log("mounted!");</span>
<span class="line">  },</span>
<span class="line">  beforeUpdate(){</span>
<span class="line">    console.log("beforeUpdate!");</span>
<span class="line">  },</span>
<span class="line">  updated(){</span>
<span class="line">    console.log("updated!");</span>
<span class="line">  },</span>
<span class="line">  beforeDestory(){</span>
<span class="line">    console.log("beforeDestory!");</span>
<span class="line">  },</span>
<span class="line">  destory(){</span>
<span class="line">    console.log("destory!");</span>
<span class="line">  }</span>
<span class="line">});</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vue-js-文件太长了-所以一步一步的写出来" tabindex="-1"><a class="header-anchor" href="#vue-js-文件太长了-所以一步一步的写出来"><span>vue.js 文件太长了，所以一步一步的写出来</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">(function (global, factory) {</span>
<span class="line">  // 判断是否node环境</span>
<span class="line">  typeof exports === 'object' &amp;&amp; typeof module !=='undefined' ? </span>
<span class="line">    module.exports = factory() :</span>
<span class="line">    // 判断是否CommonJS</span>
<span class="line">    typeof define === 'function' &amp;&amp; define.amd ? </span>
<span class="line">      define(factory) :</span>
<span class="line">      // 如果都不是，直接把factory（）的结果，即Vue对象放在全局，即浏览器端的Window</span>
<span class="line">      (global = global || self, global.Vue = factory());</span>
<span class="line">}(this, function () { </span>
<span class="line">  'use strict';</span>
<span class="line">// Vue的具体实现过程，一万多行</span>
<span class="line">}))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>具体的一万多行中，一开始看定义了非常多的方法，根本不知道是干嘛的，不明白它做的事情的会记录一下，看不懂它的过程也会记录一下，简单的跳过；</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">var emptyObject = Object.freeze({});</span>
<span class="line">// Object.freeze() 冻结对象，其他代码不能删除或更改任何属性</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


