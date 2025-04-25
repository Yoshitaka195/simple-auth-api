module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports', 'import'],
  settings: {
    // TypeScript の import を eslint-import-resolver-typescript で解決
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    // NOTE: eslint-config-prettier は extends の最後に付ける必要のある設定
    'eslint-config-prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'package.json',
    'src/i18n/**',
    'hygen/**',
    '.vscode/**',
    'nest-cli.json',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'sort-imports': 0,
    'import/order': [2, { alphabetize: { order: 'asc' } }],
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/jsx-filename-extension': 'off',
    'unused-imports/no-unused-imports-ts': 'warn',
    // NOTE: TSのコンパイルに支障があるためoff
    'import/extensions': 'off',
    // NOTE: Nest的にstaticメソッドにしては動作しない部分があるためoff
    'class-methods-use-this': 'off',
    // NOTE: export default 記述により import サジェストに多大な影響があるためoff
    'import/prefer-default-export': 'off',
    // NOTE: Jestでプライベートメソッドへのテストの必要があるためoffに設定
    'dot-notation': 'off',
    // NOTE: Jestでプライベートメソッドへのテストの必要があるためoffに設定
    '@typescript-eslint/dot-notation': ['off'],
    // NOTE: TypeORMのリレーション時に基本的に発生するためoffに設定
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.mock.ts',
          '**/*.test.ts',
          '**/*.factory.ts',
          '**/*.spec.ts',
        ],
        optionalDependencies: false,
      },
    ],
  },
  overrides: [
    {
      // TypeScript 用に設定を上書く
      files: ['*.ts'],
      rules: {},
    },
    {
      // import を sort するため、AutoFix をかける範囲で設定を上書く
      files: ['src/**/*.{js,ts}'],
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            pathGroups: [
              {
                pattern: '@alias/**',
                group: 'parent',
                position: 'before',
              },
            ],
            alphabetize: {
              order: 'asc',
            },
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
};
