export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/fe_lang/css.html", { loader: () => import(/* webpackChunkName: "fe_lang_css.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/css.html.js"), meta: {"title":""} }],
  ["/fe_lang/dev_note.html", { loader: () => import(/* webpackChunkName: "fe_lang_dev_note.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/dev_note.html.js"), meta: {"title":""} }],
  ["/fe_lang/html.html", { loader: () => import(/* webpackChunkName: "fe_lang_html.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/html.html.js"), meta: {"title":""} }],
  ["/fe_lang/javascript.html", { loader: () => import(/* webpackChunkName: "fe_lang_javascript.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/javascript.html.js"), meta: {"title":""} }],
  ["/fe_lang/tests.html", { loader: () => import(/* webpackChunkName: "fe_lang_tests.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/tests.html.js"), meta: {"title":""} }],
  ["/fe_lang/vue.html", { loader: () => import(/* webpackChunkName: "fe_lang_vue.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/vue.html.js"), meta: {"title":""} }],
  ["/notes/stock.html", { loader: () => import(/* webpackChunkName: "notes_stock.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/notes/stock.html.js"), meta: {"title":""} }],
  ["/tools/git.html", { loader: () => import(/* webpackChunkName: "tools_git.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/tools/git.html.js"), meta: {"title":""} }],
  ["/tools/linux.html", { loader: () => import(/* webpackChunkName: "tools_linux.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/tools/linux.html.js"), meta: {"title":""} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
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
