// backend/eslint.config.js
module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      sourceType: 'commonjs',
    },
  },
]
