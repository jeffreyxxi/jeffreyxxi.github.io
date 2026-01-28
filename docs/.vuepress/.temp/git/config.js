import { GitContributors } from "E:/JeffreyProject/jeffrey_notes/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_012599a0b377e6b66c99c8a8d5ac60e2/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "E:/JeffreyProject/jeffrey_notes/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_012599a0b377e6b66c99c8a8d5ac60e2/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
