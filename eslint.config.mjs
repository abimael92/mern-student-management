import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignore patterns
  { ignores: ['**/dist', '**/node_modules'] },

  // Frontend configuration
  {
    files: ['frontend/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      'no-console': 'warn',
      'react/prop-types': ['warn', { skipUndeclared: true }], // Warn but allow missing prop-types
      'no-undef': [
        'warn',
        {
          typeof: true, // Allow variables to be considered as defined when using typeof
        },
      ], // Warn about undefined variables but allow certain cases
    },
  },

  // Backend configuration
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },

  // Additional rule for JS/JSX files in the frontend
  {
    files: ['frontend/**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
    },
  },
];