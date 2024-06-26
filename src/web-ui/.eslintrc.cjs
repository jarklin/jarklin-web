// todo: verify rules
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint", "import", "jsx-a11y", "react-hooks"],
  rules: {
    "@typescript-eslint/array-type": ["warn", { "default": "array-simple" }],
    "@typescript-eslint/consistent-type-exports": "warn",
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/no-non-null-assertion": "off",

    "jsx-a11y/media-has-caption": "off",

    "no-duplicate-imports": "warn",
    // "no-use-before-define": ["warn", {
    //   "functions": false,
    //   "classes": true,
    //   "variables": true,
    //   "allowNamedExports": false
    // }],
    "arrow-body-style": ["warn", "as-needed"],
    "camelcase": "warn",
    "eqeqeq": "warn",
    "no-alert": "error",
    "no-magic-numbers": ["warn", { "ignore": [-2, -1, 0, 1, 2, 100, 1000] }],
    "no-nested-ternary": "warn",
    "no-throw-literal": "warn",
    "no-var": "warn",
    "prefer-const": "warn",
    "spaced-comment": "warn",
    "array-bracket-spacing": "warn",
    "arrow-spacing": ["warn", { "before": true, "after": true }],
    "block-spacing": "warn",
    "comma-dangle": ["warn", "always-multiline"],
    "comma-spacing": "warn",
    "dot-location": ["warn", "property"],
    "eol-last": "warn",
    "indent": ["warn", 4],
    "jsx-quotes": ["warn", "prefer-double"],
    // "max-len": ["warn", { "code": 100, "comments": 125 }],
    "newline-per-chained-call": "warn",
    "no-multiple-empty-lines": "warn",
    "no-trailing-spaces": "warn",
    "quotes": "warn",
    "semi": "warn",

    "no-console": ["warn", {"allow": ["warn", "error"]}],
    "keyword-spacing": ["error", {"before": true, "after": true}],
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"}
    ],

    "jsx-a11y/no-autofocus": "off",
  },
}
