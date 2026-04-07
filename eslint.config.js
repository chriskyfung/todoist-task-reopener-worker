import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
  },
  tseslint.configs.recommended,
{
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ScheduledController: "readonly",
        ExecutionContext: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }],
      "no-undef": "error",
    },
  }
);
