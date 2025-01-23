import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import _import from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [...fixupConfigRules(compat.extends(
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:@typescript-eslint/recommended',
)), {
  plugins: {
    import: fixupPluginRules(_import),
    react: fixupPluginRules(react),
    'react-hooks': fixupPluginRules(reactHooks),
    '@typescript-eslint': fixupPluginRules(typescriptEslint),
  },

  languageOptions: {
    globals: {
      ...globals.browser,
    },

    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',

    parserOptions: {
      project: './tsconfig.json',

      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',

    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],

      pathGroups: [{
        pattern: 'react',
        group: 'external',
        position: 'before',
      }],

      pathGroupsExcludedImportTypes: ['react'],
      'newlines-between': 'always',

      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    }],
  },
}];