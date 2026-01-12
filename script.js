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

function handleFormSubmit(event) {
	event.preventDefault();
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
	}

	// Sentinel 🛡️: Mobile menu security enhancement
	// Moved inline scripts to external file to allow for strict CSP in future
	const menuBtn = document.querySelector('.header-menu-btn');
	const nav = document.querySelector('.header-nav');

	if (menuBtn && nav) {
		menuBtn.onclick = function () {
			nav.classList.toggle('show');
		};

		// Close mobile menu on link click
		nav.querySelectorAll('a').forEach(link => {
			link.onclick = () => {
				// Use 700px breakpoint as standard, but 1350px for portfolio page
				const breakpoint = window.location.pathname.includes('portfolio.html') ? 1350 : 700;
				if (window.innerWidth <= breakpoint) {
					nav.classList.remove('show');
				}
			};
		});
	}

	// Sentinel 🛡️: Security Note
	// EmailJS public key is visible in client-side code (inevitable for static sites).
	// Ensure 'Origin Verification' is ENABLED in EmailJS dashboard to prevent unauthorized usage.

	// Booking Form Validation
	const bookingForm = document.getElementById('booking-form');

	if (bookingForm) {
		bookingForm.addEventListener('submit', function (e) {
			e.preventDefault();
			console.log("Form submitted, running validation");

			let isValid = true;

			// Helper to show/hide errors
			const toggleError = (id, valid) => {
				const errorEl = document.getElementById(id + 'Error');
				const inputEl = document.getElementById(id);
				if (errorEl && inputEl) {
					errorEl.style.display = valid ? 'none' : 'block';
					inputEl.style.borderColor = valid ? '#ddd' : '#e74c3c';
				}
			};

			// Name validation
			const name = document.getElementById('name');
			if (name.value.trim() === '') {
				toggleError('name', false);
				isValid = false;
			} else {
				toggleError('name', true);
			}

			// Email validation
			const email = document.getElementById('email');
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email.value)) {
				toggleError('email', false);
				isValid = false;
			} else {
				toggleError('email', true);
			}

			// Phone validation
			const phone = document.getElementById('phone');
			const phoneRegex = /^[\d\s\-\(\)]+$/;
			if (!phoneRegex.test(phone.value)) {
				toggleError('phone', false);
				isValid = false;
			} else {
				toggleError('phone', true);
			}

			// Shoot type validation
			const shootType = document.getElementById('shoot-type');
			if (shootType.value === '') {
				toggleError('shootType', false); // Note: ID in HTML is 'shootTypeError' but logic used 'shootType' + 'Error'
				isValid = false;
			} else {
				toggleError('shootType', true);
			}

			// Date validation
			const preferredDate = document.getElementById('preferred-date');
			if (preferredDate.value === '') {
				toggleError('preferredDate', false); // ID 'preferredDateError'
				isValid = false;
			} else {
				toggleError('preferredDate', true);
			}

			// Location validation
			const location = document.getElementById('location');
			if (location.value.trim() === '') {
				toggleError('location', false);
				isValid = false;
			} else {
				toggleError('location', true);
			}

			// If all validations pass
			if (isValid) {
				console.log("Validation passed, preparing to send email");
				// Show loading state
				const submitBtn = document.querySelector('.submit-btn');
				const originalBtnText = submitBtn.textContent;
				submitBtn.textContent = "Sending...";
				submitBtn.disabled = true;

				// Prepare template parameters
				const templateParams = {
					name: document.getElementById('name').value,
					email: document.getElementById('email').value,
					phone: document.getElementById('phone').value,
					shoot_type: document.getElementById('shoot-type').value,
					preferred_date: document.getElementById('preferred-date').value,
					alternative_date: document.getElementById('alternative-date').value || "Not provided",
					location: document.getElementById('location').value,
					notes: document.getElementById('notes').value || "No additional notes"
				};

				console.log("Sending email with parameters:", templateParams);

				// Send the email using EmailJS
				emailjs.send('service_0hcl68q', 'template_31tqjn8', templateParams, 'x0pDGPnrMj7xD0fSb')
					.then(function (response) {
						console.log('SUCCESS!', response.status, response.text);
						alert('Thank you for your booking request! I will contact you within 24-48 hours to confirm your booking.');
						bookingForm.reset();
					}, function (error) {
						console.log('FAILED...', error);
						alert('There was an error sending your booking request. Please try again or contact me directly. Error: ' + (error?.text || 'Unknown error'));
					})
					.finally(function () {
						// Reset button state
						submitBtn.textContent = originalBtnText;
						submitBtn.disabled = false;
					});
			}
		});

		// Clear validation errors when user starts typing
		const inputs = bookingForm.querySelectorAll('input, textarea, select');
		inputs.forEach(input => {
			input.addEventListener('input', function () {
				const errorId = this.id + 'Error';
				// Handle specific ID mismatches if any, but the HTML seems to follow id + 'Error' pattern
				// shoot-type -> shootTypeError? No, HTML has id="shootTypeError". Input id="shoot-type".
				// So for 'shoot-type', error ID is 'shootTypeError'.
				// My toggleError function used prefix + 'Error'.
				// Let's rely on manual check or make it robust.

				// Standardize: find error element by some logic or strict ID.
				// In HTML: <div id="shootTypeError" ...>
				// Input: <select id="shoot-type" ...>
				// Logic: if input.id is 'shoot-type', error is 'shootTypeError'.

				let specificErrorId = errorId;
				if (this.id === 'shoot-type') specificErrorId = 'shootTypeError';
				if (this.id === 'preferred-date') specificErrorId = 'preferredDateError';
				// name -> nameError
				// email -> emailError
				// phone -> phoneError
				// location -> locationError

				const errorElement = document.getElementById(specificErrorId) || document.getElementById(errorId);

				if (errorElement) {
					errorElement.style.display = 'none';
					this.style.borderColor = '#ddd';
				}
			});
		});
	}
});
