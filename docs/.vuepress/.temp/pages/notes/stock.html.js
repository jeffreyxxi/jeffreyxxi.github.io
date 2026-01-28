import comp from "/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/notes/stock.html.vue"
const data = JSON.parse("{\"path\":\"/notes/stock.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":{\"text\":\"HTML 笔记\",\"link\":\"/fe_lang/html\"},\"next\":false},\"git\":{\"updatedTime\":1769594330000,\"contributors\":[{\"name\":\"jiuping.jian\",\"username\":\"\",\"email\":\"jiuping.jian@seaboxdata.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"e1461d5646e447cf0f2dfccd224ec36e4e8b0c79\",\"time\":1769594330000,\"email\":\"jiuping.jian@seaboxdata.com\",\"author\":\"jiuping.jian\",\"message\":\"保存修改\"}]},\"filePathRelative\":\"notes/stock.md\"}")
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
