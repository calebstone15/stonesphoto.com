export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                emailjs: "readonly"
            },
            ecmaVersion: 2021,
            sourceType: "module"
        },
        rules: {
            "semi": "error",
            "prefer-const": "error"
        }
    }
];
