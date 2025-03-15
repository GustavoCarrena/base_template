import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'
import vueParser from 'vue-eslint-parser'
import globals from 'globals' // Importa globals para definir variables globales

export default [
  {
    name: 'app/base-config',
    files: ['**/*.{js,mjs,jsx,vue,ts,tsx}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 2021, // Usar ECMAScript 2021
      sourceType: 'module', // Usar módulos ES
      globals: {
        // Define variables globales para el navegador y Node.js
        ...globals.browser, // Variables globales del navegador (como localStorage y console)
        ...globals.node, // Variables globales de Node.js (como __dirname)
      },
      parser: vueParser, // Usar vue-eslint-parser para archivos .vue
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'error', // Detecta variables no usadas
    },
  },
  {
    name: 'app/vue-config',
    files: ['**/*.vue'],
    plugins: { vue },
    rules: {
      ...vue.configs['vue3-recommended'].rules,
      'vue/script-setup-uses-vars': 'error', // Asegura que las variables en <script setup> sean usadas
      'vue/no-unused-vars': 'error', // Detecta variables no usadas en Vue
      'vue/no-unused-components': 'error', // Detecta componentes no usados
      'vue/multi-word-component-names': 'off', // Desactiva si prefieres nombres de componentes de una sola palabra
      'vue/no-multiple-template-root': 'off', // Desactiva si usas Vue 3 (soporta múltiples nodos raíz)
    },
  },
  {
    name: 'app/prettier-config',
    plugins: { prettier },
    rules: {
      ...configPrettier.rules, // Desactiva reglas de ESLint que entran en conflicto con Prettier
      'prettier/prettier': 'error', // Habilita Prettier como regla de ESLint
    },
  },
]
