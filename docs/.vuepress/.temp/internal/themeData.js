export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"工具\",\"prefix\":\"tools\",\"children\":[{\"text\":\"git\",\"link\":\"/tools/git\"},{\"text\":\"linux\",\"link\":\"/tools/linux\"}]},{\"text\":\"前端语言\",\"children\":[{\"text\":\"javascript\",\"link\":\"/fe_lang/javascript\"},{\"text\":\"dev_note\",\"link\":\"/fe_lang/dev_note\"},{\"text\":\"tests\",\"link\":\"/fe_lang/tests\"},{\"text\":\"vue\",\"link\":\"/fe_lang/vue\"},{\"text\":\"css\",\"link\":\"/fe_lang/css\"},{\"text\":\"html\",\"link\":\"/fe_lang/html\"}]},{\"text\":\"其他笔记\",\"prefix\":\"notes\",\"children\":[{\"text\":\"stock\",\"link\":\"/notes/stock\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"heading\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
