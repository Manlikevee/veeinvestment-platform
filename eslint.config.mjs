import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "node_modules/**", ".npm-cache/**", "public/**"]),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      // Storage/session hydration intentionally synchronises React state with
      // browser APIs after mount. Each instance is guarded and scoped.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
