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
    element === el ? "font-bold" : ""
  }" style="line-height: 2.5rem" href="/${el}.html">
    ${el}
  </a>
</li>`
    )
    .join("");

elements.forEach(el =>
  posthtml()
    .use(
      require("posthtml-expressions")({
        locals: { list: mkNavList(el), src: `docs/${el}.md` }
      })
    )
    .use(require("@nonbili/posthtml-md-element")({ html: true }))
    .process(readFileSync("docs/index.html", "utf8"))
    .then(result => writeFileSync(`www/${el}.html`, result.html))
);
