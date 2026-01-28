import comp from "E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/html.html.vue"
const data = JSON.parse("{\"path\":\"/html.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":false,\"next\":false},\"git\":{},\"filePathRelative\":\"html.md\"}")
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
