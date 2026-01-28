import comp from "/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/fe_lang/html.html.vue"
const data = JSON.parse("{\"path\":\"/fe_lang/html.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":{\"text\":\"CSS 笔记\",\"link\":\"/fe_lang/css\"},\"next\":{\"text\":\"股票兴趣\",\"link\":\"/notes/stock\"}},\"git\":{\"updatedTime\":1769594330000,\"contributors\":[{\"name\":\"jiuping.jian\",\"username\":\"\",\"email\":\"jiuping.jian@seaboxdata.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"e1461d5646e447cf0f2dfccd224ec36e4e8b0c79\",\"time\":1769594330000,\"email\":\"jiuping.jian@seaboxdata.com\",\"author\":\"jiuping.jian\",\"message\":\"保存修改\"}]},\"filePathRelative\":\"fe_lang/html.md\"}")
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
