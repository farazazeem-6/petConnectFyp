import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import noUnusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },

  {
    plugins: {
      'unused-imports': noUnusedImports,
    },

    rules: {
      'react-hooks/set-state-in-effect': 'off',

      // ❌ No warnings — build should fail
      'no-warning-comments': 'error',

      // ❌ No console logs
      'no-console': 'error',

      // ❌ No unused vars / imports
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',

      // ❌ No index key in .map()
      'react/no-array-index-key': 'error',

      // ✅ Must always have a key in mapped JSX
      'react/jsx-key': 'error',

      // ❌ Always require semicolons
      semi: ['error', 'always'],

      // ❌ Cannot use restricted HTML tags
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.name='img']",
          message: 'Use <Image /> from next/image instead of <img>',
        },
        {
          selector: "JSXOpeningElement[name.name='a']",
          message: 'Use <Link /> from next/link instead of <a>',
        },
        {
          selector: "JSXOpeningElement[name.name='div']",
          message: 'Use a styled component instead of <div>',
        },
        {
          selector: "JSXOpeningElement[name.name='h1']",
          message: 'Use a styled component instead of <h1>',
        },
        {
          selector: "JSXOpeningElement[name.name='p']",
          message: 'Use a styled component instead of <p>',
        },
      ],
    },
  },
]);
