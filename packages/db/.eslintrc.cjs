/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@laitjy/custom"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
