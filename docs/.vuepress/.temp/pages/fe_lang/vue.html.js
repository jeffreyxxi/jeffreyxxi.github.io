import comp from "E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/vue.html.vue"
const data = JSON.parse("{\"path\":\"/fe_lang/vue.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":\"/tests\",\"next\":\"/linux\"},\"git\":{},\"filePathRelative\":\"fe_lang/vue.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
