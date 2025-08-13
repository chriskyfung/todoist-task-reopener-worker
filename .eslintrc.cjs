module.exports = {
  root: true,
  ignorePatterns: ["dist", "node_modules"],
  env: {
    serviceworker: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }],
    "no-undef": "error",
  },
  globals: {
    ScheduledController: "readonly",
    ExecutionContext: "readonly",
  },
};