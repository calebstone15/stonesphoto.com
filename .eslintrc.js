module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "no-console": "off",
    "no-unused-vars": "warn",
    "no-undef": "off"
  },
  "globals": {
    "emailjs": "readonly",
    "toast": "readonly",
    "Utils": "readonly",
    "Chart": "readonly",
    "Papa": "readonly",
    "ModalManager": "readonly",
    "PromptDialog": "readonly",
    "EmailConfig": "readonly"
  }
};
