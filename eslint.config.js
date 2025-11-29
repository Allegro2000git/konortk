import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, prettier: prettierPlugin },
    extends: ["js/recommended", prettierConfig],
    languageOptions: { globals: { ...globals.browser, ...globals.es2020 } },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      eqeqeq: "warn",
      curly: "warn",
      "no-else-return": "warn",
    },
  },
  tseslint.configs.recommended,
]);
