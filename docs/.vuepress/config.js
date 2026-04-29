import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  base: "/",
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      {
        text: "工具",
        prefix: "tools",
        children: [
          { text: "git", link: "/tools/git" },
          { text: "linux", link: "/tools/linux" },
        ],
      },
      {
        text: "AI",
        prefix: "ai",
        children: [
          { text: "总览", link: "/ai/" },
          { text: "工具链", link: "/ai/agent-tools" },
          { text: "模型搭配与选型", link: "/ai/model-selection" },
          { text: "实践计划和记录", link: "/ai/practice-plan" },
          { text: "官方资料入口", link: "/ai/references" },
        ],
      },
      {
        text: "前端语言",
        children: [
          { text: "javascript", link: "/fe_lang/javascript" },
          { text: "dev_note", link: "/fe_lang/dev_note" },
          { text: "tests", link: "/fe_lang/tests" },
          { text: "vue", link: "/fe_lang/vue" },
          { text: "css", link: "/fe_lang/css" },
          { text: "html", link: "/fe_lang/html" },
        ],
      },
      {
        text: "其他笔记",
        prefix: "notes",
        children: [{ text: "stock", link: "/notes/stock" }],
      },
    ],
  }),
  title: "jeffrey's notes",
});
