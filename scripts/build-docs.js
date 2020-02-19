const { readFileSync, writeFileSync } = require("fs");

const posthtml = require("posthtml");

const files = ["hunch-tabs", "hunch-carousel", "hunch-focus"];

files.forEach(name =>
  posthtml()
    .use(
      require("posthtml-expressions")({ locals: { src: `docs/${name}.md` } })
    )
    .use(require("@nonbili/posthtml-md-element")({ html: true }))
    .process(readFileSync("docs/index.html", "utf8"))
    .then(result => writeFileSync(`www/${name}.html`, result.html))
);
