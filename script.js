console.log("Stones Photos site loaded!");

// Robust, idempotent EmailJS init
(function initEmailJS() {
	if (!window.__EMAILJS_INITIALIZED__) {
		if (window.emailjs && typeof window.emailjs.init === 'function') {
			try {
				// Use string signature for widest compatibility
				emailjs.init("x0pDGPnrMj7xD0fSb");
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

function showError(input, errorId) {
	const errorDiv = document.getElementById(errorId);
	if (errorDiv) errorDiv.style.display = 'block';
	input.setAttribute('aria-invalid', 'true');
	input.style.borderColor = '#e74c3c';
}

function clearError(input, errorId) {
	const errorDiv = document.getElementById(errorId);
	if (errorDiv) errorDiv.style.display = 'none';
	input.setAttribute('aria-invalid', 'false');
	input.style.borderColor = '';
}

function validateForm() {
	let isValid = true;
	let firstInvalid = null;

	const validators = [
		{ id: 'name', errorId: 'nameError', validate: val => val.trim() !== '' },
		{ id: 'email', errorId: 'emailError', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
		{ id: 'phone', errorId: 'phoneError', validate: val => !val.trim() || val.replace(/\D/g, '').length >= 7 },
		{ id: 'interest', errorId: 'interestError', validate: val => val !== '' },
		{ id: 'message', errorId: 'messageError', validate: val => val.trim() !== '' }
	];

	validators.forEach(({ id, errorId, validate }) => {
		const input = document.getElementById(id);
		const valid = validate(input.value);
		if (!valid) {
			showError(input, errorId);
			isValid = false;
			if (!firstInvalid) firstInvalid = input;
		} else {
			clearError(input, errorId);
		}
	});

	if (firstInvalid) firstInvalid.focus();
	return isValid;
}

function handleFormSubmit(event) {
	event.preventDefault();

	if (!validateForm()) {
		return;
	}

	const form = event.target;
	const formMessage = document.getElementById('form-message');

	// Disable button to prevent multiple submissions
	const submitBtn = form.querySelector('button[type="submit"]');
	submitBtn.disabled = true;
	submitBtn.textContent = 'Sending...';

	const formData = {
		name: document.getElementById('name').value.trim(),
		email: document.getElementById('email').value.trim(),
		phone: document.getElementById('phone').value.trim(),
		interest: document.getElementById('interest').value,
		message: document.getElementById('message').value.trim()
	};

	// Pass public key as 4th arg as a fallback in case init wasn't effective
	emailjs.send("service_0hcl68q", "template_3codtcb", formData, "x0pDGPnrMj7xD0fSb")
		.then(function() {
			formMessage.style.display = 'block';
			formMessage.style.color = '#2193b0';
			formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
			form.reset();
			submitBtn.disabled = false;
			submitBtn.textContent = 'Send Message';
		}, function(error) {
			formMessage.style.display = 'block';
			formMessage.style.color = '#d32f2f';
			formMessage.textContent = 'Failed to send message. Please try again or contact me directly.';
			submitBtn.disabled = false;
			submitBtn.textContent = 'Send Message';
			console.error('EmailJS error:', error);
		});
}

document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('contact-form');

	if (form) {
		form.addEventListener('submit', handleFormSubmit);

		// Real-time error clearing
		const inputs = [
			{ id: 'name', errorId: 'nameError' },
			{ id: 'email', errorId: 'emailError' },
			{ id: 'phone', errorId: 'phoneError' },
			{ id: 'interest', errorId: 'interestError' },
			{ id: 'message', errorId: 'messageError' }
		];

		inputs.forEach(item => {
			const input = document.getElementById(item.id);
			if (input) {
				input.addEventListener('input', () => clearError(input, item.errorId));
				// For select element
				input.addEventListener('change', () => clearError(input, item.errorId));
			}
		});
	}
});
