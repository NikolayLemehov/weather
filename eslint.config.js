import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
// import { fixupPluginRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,                  // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname,       // optional
  recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  ...compat.extends("plugin:react-hooks/recommended"),
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        // project: ['tsconfig.json'],
        "ecmaVersion": "latest",
        "sourceType": "module",
      }
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "sibling", "internal", "parent", "index"],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "newlines-between": "always",
          // alphabetize: {
          //   order: 'asc',
          //   caseInsensitive: true,
          // },
        },
      ],
      "no-use-before-define": "off",
      "no-duplicate-imports": "error",
      "import/prefer-default-export": "off",
      "no-shadow": "off",

      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/no-use-before-define": ["error"],
      "@typescript-eslint/no-unused-vars": ["error", {
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      }],

      "padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": "*",
          "next": "return"
        },
      ],
      'prefer-const': 'error',
    },
  },
);