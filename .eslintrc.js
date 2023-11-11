module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 'plugin:node/recommended-module',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    es2017: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
  rules: {
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: [
          'block-like',
          'multiline-const',
          'multiline-expression',
          'multiline-let',
          'multiline-var',
        ],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block-like',
          'multiline-const',
          'multiline-expression',
          'multiline-let',
          'multiline-var',
        ],
      },
      { blankLine: 'always', prev: '*', next: ['return'] },
      { blankLine: 'always', prev: '*', next: ['throw'] },
    ],
    // Disabled the following rules for now due to a large amount of lint errors
    '@typescript-eslint/no-unsafe-member-access': ['off'],
    '@typescript-eslint/no-unsafe-return': ['off'],
    '@typescript-eslint/no-unsafe-assignment': ['off'],
    '@typescript-eslint/no-unsafe-call': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
};
