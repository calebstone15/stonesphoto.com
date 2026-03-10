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
    "no-unused-vars": "warn"
  },
  "globals": {
    "emailjs": "readonly",
    "Chart": "readonly",
    "Papa": "readonly",
    "toast": "readonly",
    "ModalManager": "readonly",
    "Utils": "readonly",
    "EmailConfig": "readonly",
    "AnalyzerContext": "readonly",
    "PromptDialog": "readonly",
    "app": "readonly"
  }
};