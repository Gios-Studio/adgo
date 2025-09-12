// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      // ✅ Keep only critical rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ❌ Silence noisy TS rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",

      // ❌ Disable general annoyances
      "no-unsafe-optional-chaining": "off",
      "no-undef": "off",
    },
    ignores: [
      ".next/**",
      "dist/**",
      "build/**",
      "supabase/functions/**",
      "**/*.d.ts",
      "scripts/**",
    ],
  },
];