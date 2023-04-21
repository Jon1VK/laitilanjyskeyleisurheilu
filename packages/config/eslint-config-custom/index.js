require("@rushstack/eslint-patch/modern-module-resolution");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      { checksVoidReturn: { attributes: false } },
    ],
    "@typescript-eslint/consistent-type-imports": 2,
  },
  overrides: [
    {
      files: ["*.astro"],
      env: { "astro/astro": true },
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      extends: [
        "plugin:astro/recommended",
        "plugin:astro/jsx-a11y-recommended",
      ],
    },
    {
      files: ["*.tsx"],
      extends: ["plugin:solid/typescript", "plugin:jsx-a11y/recommended"],
      rules: {
        "jsx-a11y/label-has-associated-control": 0,
      },
    },
  ],
  ignorePatterns: [".eslintrc.cjs", "*.config.cjs", "*.config.mjs"],
  reportUnusedDisableDirectives: true,
};
