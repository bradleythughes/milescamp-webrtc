module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
