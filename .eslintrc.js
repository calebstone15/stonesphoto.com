module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "no-console": "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
  },
  "globals": {
    "emailjs": "readonly",
    "Papa": "readonly",
    "Chart": "readonly",
    "toast": "readonly",
    "ModalManager": "readonly",
    "PromptDialog": "readonly",
    "Utils": "readonly",
    "EmailConfig": "readonly"
  }
};
