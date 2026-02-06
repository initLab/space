import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
// import prettierConfigRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
    // prettierConfigRecommended,
    reactHooks.configs.flat.recommended,
    eslint.configs.recommended,
    tseslint.configs.recommended,
    globalIgnores(["dist/"]),
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],
    reactRefresh.configs.vite,
    { languageOptions: { globals: globals.node } },
    { settings: { react: { version: "detect" } } },
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "no-unused-vars": "off",
        },
    },
]);
