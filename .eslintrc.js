module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*/__tests__/**/*.js'],
      rules: {
        'max-lines-per-function': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'max-params': ['error', 3],
    'max-lines-per-function': ['error', { max: 10 }],
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    'class-methods-use-this': 'off',
  },
};
