import comp from "/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/node.html.vue"
const data = JSON.parse("{\"path\":\"/node.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":\"./linux\",\"next\":\"./modules\"},\"git\":{\"updatedTime\":1721738315000,\"contributors\":[{\"name\":\"jeffrey\",\"username\":\"jeffrey\",\"email\":\"1600793739@qq.com\",\"commits\":1,\"url\":\"https://github.com/jeffrey\"}],\"changelog\":[{\"hash\":\"d57e073e3a61913f95747374e581dd1d3e51b1e2\",\"time\":1721738315000,\"email\":\"1600793739@qq.com\",\"author\":\"jeffrey\",\"message\":\"老仓库迁徙更新\"}]},\"filePathRelative\":\"node.md\"}")
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
