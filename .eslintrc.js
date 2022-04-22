module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  overrides: [
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ],
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier', 'airbnb-base',
    'plugin:vue/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 1,
    'vue/max-len': 0,
    'no-unused-vars': 'off',
  },
};
