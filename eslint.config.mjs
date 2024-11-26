import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";  // Import the Jest plugin

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,  // Node.js globals (e.g., `require`, `module`)
        ...globals.jest,  // Jest globals (e.g., `describe`, `it`, `expect`, etc.)
      },
    },
  },
  pluginJs.configs.recommended,  // Use the ESLint recommended JavaScript rules
  {
    plugins: {
      jest: pluginJest,  // Define the Jest plugin as an object
    },
    rules: {
      ...pluginJest.configs.recommended.rules,  // Directly include Jest's recommended rules
    },
  },
];
