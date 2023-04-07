module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
    "astro/astro": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: __dirname + "/tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      2,
      { args: "all", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: { extraFileExtensions: [".astro"] },
      extends: [
        "plugin:astro/recommended",
        "plugin:astro/jsx-a11y-recommended",
      ],
    },
    {
      files: ["*.tsx"],
      extends: ["plugin:solid/typescript", "plugin:jsx-a11y/recommended"],
      rules: {
        "@typescript-eslint/no-misused-promises": [
          2,
          { checksVoidReturn: { attributes: false } },
        ],
        "jsx-a11y/label-has-associated-control": 0,
      },
    },
  ],
};
