console.log("Stones Photos site loaded!");

const EMAIL_CONFIG = {
    PUBLIC_KEY: "x0pDGPnrMj7xD0fSb",
    SERVICE_ID: "service_0hcl68q",
    TEMPLATE_ID: "template_3codtcb"
};

// Robust, idempotent EmailJS init
(function initEmailJS() {
    if (!window.__EMAILJS_INITIALIZED__) {
        if (window.emailjs && typeof window.emailjs.init === 'function') {
            try {
                // Use string signature for widest compatibility
                emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
                window.__EMAILJS_INITIALIZED__ = true;
                console.log("EmailJS initialized in script.js");
            } catch (e) {
                console.error("EmailJS init failed:", e);
            }
        } else {
            console.error("EmailJS SDK not loaded before init.");
        }
    }
})();

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sendEmail(formData) {
    return emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        formData,
        EMAIL_CONFIG.PUBLIC_KEY
    );
}

function updateFormUI(form, status, message = "") {
    const formMessage = document.getElementById('form-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (status === 'sending') {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formMessage.style.display = 'none';
    } else if (status === 'success') {
        formMessage.style.display = 'block';
        formMessage.style.color = '#2193b0';
        formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    } else if (status === 'error') {
        formMessage.style.display = 'block';
        formMessage.style.color = '#d32f2f';
        formMessage.textContent = message || 'Failed to send message. Please try again or contact me directly.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value.trim()
    };

    if (!validateEmail(formData.email)) {
        updateFormUI(form, 'error', 'Please enter a valid email address.');
        return;
    }

    updateFormUI(form, 'sending');

    sendEmail(formData)
        .then(function() {
            updateFormUI(form, 'success');
        }, function(error) {
            console.error('EmailJS error:', error);
            updateFormUI(form, 'error');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
