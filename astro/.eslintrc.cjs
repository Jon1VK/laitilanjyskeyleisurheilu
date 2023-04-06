module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
    'astro/astro': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'tailwindcss/classnames-order': 0,
    'tailwindcss/no-custom-classname': [
      1,
      {
        config: __dirname + '/tailwind.config.cjs',
      },
    ],
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      extends: [
        'plugin:astro/recommended',
        'plugin:astro/jsx-a11y-recommended',
      ],
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          2,
          { args: 'all', argsIgnorePattern: '^_' },
        ],
      },
    },
    {
      files: ['*.tsx'],
      extends: ['plugin:solid/typescript', 'plugin:jsx-a11y/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { varsIgnorePattern: '^_' }],
        '@typescript-eslint/no-misused-promises': [
          2,
          { checksVoidReturn: { attributes: false } },
        ],
        'jsx-a11y/label-has-associated-control': 0,
      },
    },
  ],
};
