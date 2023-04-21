/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@laitjy/custom"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
