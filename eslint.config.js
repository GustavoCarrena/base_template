import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue,ts,tsx}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['node_modules/**', 'dist/**'],
  },
  js.configs.recommended,
  {
    name: 'app/vue-config',
    files: ['**/*.vue'],
    plugins: { vue },
    rules: {
      'vue/script-setup-uses-vars': 'error',
    },
  },
  {
    name: 'app/prettier',
    plugins: { prettier },
    rules: {
      ...configPrettier.rules,
      'prettier/prettier': 'error',
    },
  }
]
