import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

/**
 * ESLint 9 flat config: TypeScript + React hooks + Vite fast refresh rules on source files.
 *
 * `projectService: true` enables typescript-eslint’s type-aware linting without listing every TS project.
 */
export default defineConfig([
  globalIgnores(['dist']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
    },
  },
  {
    files: ['eslint.config.js', 'vite.config.js'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
]);
