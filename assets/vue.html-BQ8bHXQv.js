import{_ as n,c as e,a,o as l}from"./app-CzxXQkrq.js";const i={};function d(t,s){return l(),e("div",null,[...s[0]||(s[0]=[a(`<h2 id="vue-笔记整理" tabindex="-1"><a class="header-anchor" href="#vue-笔记整理"><span>vue 笔记整理</span></a></h2><h3 id="源码阅读" tabindex="-1"><a class="header-anchor" href="#源码阅读"><span>源码阅读</span></a></h3><ul><li>为了方便，采取最简单的方式，从github获取Vue项目，构建后获取未压缩vue.js，然后直接在页面中引入vue.js，逐步debugger，了解vue到底替我们做了什么；</li></ul><h4 id="html代码" tabindex="-1"><a class="header-anchor" href="#html代码"><span>html代码</span></a></h4><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;html&gt;</span>
<span class="line">  &lt;head&gt;</span>
<span class="line"></span>
<span class="line">  &lt;/head&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">    &lt;div id=&quot;app&quot;&gt;</span>
<span class="line">      &lt;input type=&quot;text&quot; v-model=&quot;input&quot; /&gt;</span>
<span class="line">      &lt;div&gt;{{input}}&lt;/div&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">  &lt;script src=&quot;./../dist/vue.js&quot;&gt;&lt;/script&gt;</span>
<span class="line">  &lt;script src=&quot;./debug.js&quot;&gt;&lt;/script&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="debug-js-文档" tabindex="-1"><a class="header-anchor" href="#debug-js-文档"><span>debug.js 文档</span></a></h4><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">new Vue({</span>
<span class="line">  el:&quot;#app&quot;,</span>
<span class="line">  data(){</span>
<span class="line">    return{</span>
<span class="line">      input:&quot;&quot;</span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  beforeCreate(){</span>
<span class="line">    console.log(&quot;beforeCreated&quot;);</span>
<span class="line">  },</span>
<span class="line">  created(){</span>
<span class="line">    console.log(&quot;created!&quot;);</span>
<span class="line">  },</span>
<span class="line">  beforeMount(){</span>
<span class="line">    console.log(&quot;beforeMounted!&quot;);</span>
<span class="line">  },</span>
<span class="line">  mounted(){</span>
<span class="line">    console.log(&quot;mounted!&quot;);</span>
<span class="line">  },</span>
<span class="line">  beforeUpdate(){</span>
<span class="line">    console.log(&quot;beforeUpdate!&quot;);</span>
<span class="line">  },</span>
<span class="line">  updated(){</span>
<span class="line">    console.log(&quot;updated!&quot;);</span>
<span class="line">  },</span>
<span class="line">  beforeDestory(){</span>
<span class="line">    console.log(&quot;beforeDestory!&quot;);</span>
<span class="line">  },</span>
<span class="line">  destory(){</span>
<span class="line">    console.log(&quot;destory!&quot;);</span>
<span class="line">  }</span>
<span class="line">});</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vue-js-文件太长了-所以一步一步的写出来" tabindex="-1"><a class="header-anchor" href="#vue-js-文件太长了-所以一步一步的写出来"><span>vue.js 文件太长了，所以一步一步的写出来</span></a></h4><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function (global, factory) {</span>
<span class="line">  // 判断是否node环境</span>
<span class="line">  typeof exports === &#39;object&#39; &amp;&amp; typeof module !==&#39;undefined&#39; ?</span>
<span class="line">    module.exports = factory() :</span>
<span class="line">    // 判断是否CommonJS</span>
<span class="line">    typeof define === &#39;function&#39; &amp;&amp; define.amd ?</span>
<span class="line">      define(factory) :</span>
<span class="line">      // 如果都不是，直接把factory（）的结果，即Vue对象放在全局，即浏览器端的Window</span>
<span class="line">      (global = global || self, global.Vue = factory());</span>
<span class="line">}(this, function () {</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line">// Vue的具体实现过程，一万多行</span>
<span class="line">}))</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>具体的一万多行中，一开始看定义了非常多的方法，根本不知道是干嘛的，不明白它做的事情的会记录一下，看不懂它的过程也会记录一下，简单的跳过；</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">var emptyObject = Object.freeze({});</span>
<span class="line">// Object.freeze() 冻结对象，其他代码不能删除或更改任何属性</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,11)])])}const p=n(i,[["render",d]]),r=JSON.parse('{"path":"/fe_lang/vue.html","title":"","lang":"en-US","frontmatter":{"prev":{"text":"面试总结","link":"/fe_lang/tests"},"next":{"text":"CSS 笔记","link":"/fe_lang/css"}},"git":{"updatedTime":1769610076000,"contributors":[{"name":"jeffrey","username":"jeffrey","email":"1600793739@qq.com","commits":2,"url":"https://github.com/jeffrey"},{"name":"jiuping.jian","username":"","email":"jiuping.jian@seaboxdata.com","commits":1}],"changelog":[{"hash":"359cc5199d913f411bb0c1686bd44e4617832f24","time":1769610076000,"email":"1600793739@qq.com","author":"jeffrey","message":"整理笔记"},{"hash":"e1461d5646e447cf0f2dfccd224ec36e4e8b0c79","time":1769594330000,"email":"jiuping.jian@seaboxdata.com","author":"jiuping.jian","message":"保存修改"},{"hash":"d57e073e3a61913f95747374e581dd1d3e51b1e2","time":1721738315000,"email":"1600793739@qq.com","author":"jeffrey","message":"老仓库迁徙更新"}]},"filePathRelative":"fe_lang/vue.md"}');export{p as comp,r as data};
