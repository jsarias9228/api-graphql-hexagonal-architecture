module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  plugins: [],
  rules: {
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false }
    ]
  }
}
