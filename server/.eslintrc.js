module.exports = {
  env: {
    node: true,
  },
  extends: ["plugin:prettier/recommended"],
  ignorePatterns: ["/node_modules/**"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
  },
};
