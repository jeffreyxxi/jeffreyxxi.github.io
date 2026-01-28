import comp from "/Users/jianjiuping/projects/jeffrey/notes/docs/.vuepress/.temp/pages/tools/linux.html.vue"
const data = JSON.parse("{\"path\":\"/tools/linux.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"prev\":{\"text\":\"git 日常使用\",\"link\":\"/tools/git\"},\"next\":{\"text\":\"javascript 笔记\",\"link\":\"/fe_lang/javascript\"}},\"git\":{\"updatedTime\":1769594330000,\"contributors\":[{\"name\":\"jeffrey\",\"username\":\"jeffrey\",\"email\":\"1600793739@qq.com\",\"commits\":2,\"url\":\"https://github.com/jeffrey\"},{\"name\":\"jiuping.jian\",\"username\":\"\",\"email\":\"jiuping.jian@seaboxdata.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"e1461d5646e447cf0f2dfccd224ec36e4e8b0c79\",\"time\":1769594330000,\"email\":\"jiuping.jian@seaboxdata.com\",\"author\":\"jiuping.jian\",\"message\":\"保存修改\"},{\"hash\":\"8955283f6ec2d696741ae53018c33b2c8a6361b7\",\"time\":1769523449000,\"email\":\"1600793739@qq.com\",\"author\":\"jeffrey\",\"message\":\"居然有内容没保存！！！\"},{\"hash\":\"d57e073e3a61913f95747374e581dd1d3e51b1e2\",\"time\":1721738315000,\"email\":\"1600793739@qq.com\",\"author\":\"jeffrey\",\"message\":\"老仓库迁徙更新\"}]},\"filePathRelative\":\"tools/linux.md\"}")
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
