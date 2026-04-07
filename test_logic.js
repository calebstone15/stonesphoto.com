const fs = require('fs');
const vm = require('vm');

function test_computeVenturiLogic() {
    const scriptContent = fs.readFileSync('EAA Web Version/js/hotfire-analyzer.js', 'utf8');
    const utilsContent = fs.readFileSync('EAA Web Version/js/utils.js', 'utf8');

    const context = {
        window: {},
        document: {
            addEventListener: () => {}
        },
        console: console,
        Chart: {},
        Papa: {},
        toast: {},
        ModalManager: {},
        PromptDialog: {}
    };
    vm.createContext(context);

    vm.runInContext(utilsContent, context);
    vm.runInContext(scriptContent, context);

    vm.runInContext(`
        const time = [0, 1, 2];
        const p1_psi = [100, 100, 100];
        const p2_psi = [50, 50, 50];
        const a1_in2 = 1.0;
        const a2_in2 = 0.5;
        const cd = 0.9;
        const y = 1.0;
        const rho = 1000;

        const result = _computeVenturiLogic(a1_in2, a2_in2, cd, y, rho, time, p1_psi, p2_psi);
        if (result.length === 3 && result[0] > 0 && result[1] > 0 && result[2] > 0) {
            console.log("test_computeVenturiLogic passed.");
        } else {
            throw new Error("test_computeVenturiLogic failed: " + result);
        }
    `, context);
}

test_computeVenturiLogic();
