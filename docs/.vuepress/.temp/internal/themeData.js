export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"前端语言\",\"prefix\":\"lang\",\"children\":[{\"text\":\"html\",\"link\":\"\"},{\"text\":\"javascript\",\"link\":\"/javascript\"},{\"text\":\"css\",\"link\":\"\"}]},{\"text\":\"框架\",\"prefix\":\"frame\",\"children\":[{\"text\":\"vue\",\"link\":\"/vue\"}]},{\"text\":\"工具\",\"prefix\":\"tools\",\"children\":[{\"text\":\"git\",\"link\":\"/git\"}]},{\"text\":\"笔记\",\"prefix\":\"notes\",\"children\":[{\"text\":\"linux\",\"link\":\"/linux\"},{\"text\":\"modules\",\"link\":\"/modules\"},{\"text\":\"node\",\"link\":\"/node\"},{\"text\":\"tests\",\"link\":\"/tests\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"heading\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
