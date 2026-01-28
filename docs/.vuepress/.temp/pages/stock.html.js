import comp from "E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/stock.html.vue"
const data = JSON.parse("{\"path\":\"/stock.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":\"/dev_note\",\"next\":false},\"git\":{},\"filePathRelative\":\"stock.md\"}")
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
