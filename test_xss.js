const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Setup mock DOM
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// Load app.js
const appJsPath = path.join(__dirname, 'EAA Web Version/js/app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf-8');

// Evaluate app.js in the context of our mock window
const scriptEl = document.createElement("script");
scriptEl.textContent = appJsContent;
document.body.appendChild(scriptEl);

const payload = '<img src=x onerror="xssTriggered = true">';

try {
  // Test ToastManager (already instatiated as window.toast in app.js, but we can also use window.toast directly)
  window.toast.show(payload);

  // Verify ToastManager XSS didn't execute and content is safely escaped
  const toasts = document.querySelectorAll('.toast');
  const toastContent = toasts[0].innerHTML;
  if (toastContent.includes('<img src="x" onerror="xssTriggered = true">') || toastContent.includes('<img src=x')) {
      console.error("FAIL: ToastManager vulnerable to XSS");
      process.exit(1);
  }

  // Clean up
  toasts.forEach(t => t.remove());

  // Test PromptDialog
  window.PromptDialog.show(payload, payload);

  const modals = document.querySelectorAll('.modal');
  if(modals.length > 0) {
      const modalHtml = modals[0].innerHTML;
      if (modalHtml.includes('<img src="x" onerror="xssTriggered = true">') || modalHtml.includes('<img src=x')) {
        console.error("FAIL: PromptDialog vulnerable to XSS");
        process.exit(1);
      }
  } else {
      console.error("FAIL: Modal not found");
      process.exit(1);
  }

  console.log("PASS: XSS prevention successful.");
  process.exit(0);

} catch (e) {
  console.error("Error during test:", e);
  process.exit(1);
}
