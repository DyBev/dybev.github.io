// eslint.config.js
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      prettier: prettierPlugin,
    },
    rules: {
      // base rules
      semi: "error",
      "prefer-const": "error",

      // react rules
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // prettier formatting through eslint
      "prettier/prettier": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  prettierConfig,
]);


