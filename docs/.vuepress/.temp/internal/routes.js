export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/git.html", { loader: () => import(/* webpackChunkName: "git.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/git.html.js"), meta: {"title":""} }],
  ["/javascript.html", { loader: () => import(/* webpackChunkName: "javascript.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/javascript.html.js"), meta: {"title":""} }],
  ["/linux.html", { loader: () => import(/* webpackChunkName: "linux.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/linux.html.js"), meta: {"title":""} }],
  ["/modules.html", { loader: () => import(/* webpackChunkName: "modules.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/modules.html.js"), meta: {"title":""} }],
  ["/node.html", { loader: () => import(/* webpackChunkName: "node.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/node.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/tests.html", { loader: () => import(/* webpackChunkName: "tests.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/tests.html.js"), meta: {"title":""} }],
  ["/vue.html", { loader: () => import(/* webpackChunkName: "vue.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/vue.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
