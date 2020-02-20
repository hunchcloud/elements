const { readFileSync, writeFileSync } = require("fs");
const posthtml = require("posthtml");

const readme = readFileSync("docs/README.md", "utf8");

const elements = [...readme.matchAll(/]\((.*)\.md\)/g)].map(item => item[1]);

const mkNavList = element =>
  elements
    .map(
      el => `
<li>
  <a class="block pl-4 pr-16 ${
    element === el
      ? "font-medium text-purple-500"
      : "hover:text-gray-800 text-gray-600"
  }" style="line-height: 2.5rem" href="/${el}.html">
    ${el}
  </a>
</li>`
    )
    .join("");

const mdToHtml = (src, dst, navItem) =>
  posthtml()
    .use(
      require("posthtml-expressions")({
        locals: { list: mkNavList(navItem), src }
      })
    )
    .use(require("@nonbili/posthtml-md-element")({ html: true }))
    .process(readFileSync("docs/index.html", "utf8"))
    .then(result => writeFileSync(dst, result.html));

elements.forEach(el => mdToHtml("README.md", "www/index.html"));
elements.forEach(el => mdToHtml(`docs/${el}.md`, `www/${el}.html`, el));
