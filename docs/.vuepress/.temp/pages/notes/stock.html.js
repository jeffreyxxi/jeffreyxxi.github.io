import comp from "E:/JeffreyProject/jeffrey_notes/docs/.vuepress/.temp/pages/notes/stock.html.vue"
const data = JSON.parse("{\"path\":\"/notes/stock.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":{\"text\":\"Linux 命令整理\",\"link\":\"/tools/linux\"},\"next\":false},\"git\":{},\"filePathRelative\":\"notes/stock.md\"}")
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
