// eslint.config.js
import next from "eslint-config-next";

export default [
  ...next(),
  {
    ignores: [
      ".next/**",
      "dist/**",
      "build/**",
      "supabase/functions/**",
      "**/*.d.ts"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react-refresh/only-export-components": "warn",
      "no-unsafe-optional-chaining": "warn"
    }
  }
];