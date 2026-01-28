import comp from "E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/fe_lang/tests.html.vue"
const data = JSON.parse("{\"path\":\"/fe_lang/tests.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":\"/git\",\"next\":\"/vue\"},\"git\":{},\"filePathRelative\":\"fe_lang/tests.md\"}")
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
