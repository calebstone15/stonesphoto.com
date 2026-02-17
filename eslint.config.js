export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                setInterval: "readonly",
                clearTimeout: "readonly",
                clearInterval: "readonly",
                emailjs: "readonly",
                EmailConfig: "readonly",
                Papa: "readonly",
                Chart: "readonly",
                Utils: "readonly",
                AnalyzerContext: "readonly",
                ModalManager: "readonly",
                ToastManager: "readonly",
                PromptDialog: "readonly",
                ctx: "readonly",
                currentChart: "writable",
                currentPlotData: "writable",
                selectedPoints: "writable",
                customPlotConstantLines: "writable",
                customPlotRawDatasets: "writable",
                cdaState: "readonly",
                timeSelectionChart: "writable",
                clickCount: "writable",
                currentExtraDataPercent: "writable",
                currentVenturiType: "writable",
                toast: "readonly"
            }
        },
        rules: {
            "no-console": "off",
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    }
];
