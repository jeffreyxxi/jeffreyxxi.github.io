import { CodeTabs } from "E:/JeffreyProject/jeffrey_notes/node_modules/.pnpm/@vuepress+plugin-markdown-t_021281e2e71064b222a784b96ffe377e/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "E:/JeffreyProject/jeffrey_notes/node_modules/.pnpm/@vuepress+plugin-markdown-t_021281e2e71064b222a784b96ffe377e/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "E:/JeffreyProject/jeffrey_notes/node_modules/.pnpm/@vuepress+plugin-markdown-t_021281e2e71064b222a784b96ffe377e/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
