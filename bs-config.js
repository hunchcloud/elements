module.exports = {
  server: {
    baseDir: "example",
    files: ["./dist/**/*.js", "./example/index.html"],
    injectChanges: false,
    routes: {
      "/dist": "dist"
    }
  }
};
