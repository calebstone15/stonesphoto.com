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

function initMobileMenu() {
	const menuBtn = document.querySelector('.header-menu-btn');
	const nav = document.querySelector('.header-nav');
	if (menuBtn && nav) {
		menuBtn.onclick = function() {
			nav.classList.toggle('show');
		};
		// Close mobile menu on link click
		nav.querySelectorAll('a').forEach(link => {
			link.onclick = () => {
				if (window.innerWidth <= 700) {
					nav.classList.remove('show');
				}
			};
		});
	}
}

function handleBookingSubmit(event) {
	event.preventDefault();
	const form = event.target;
	const formMessage = document.getElementById('form-message');
	let isValid = true;

	// Helper to show/hide error
	const showError = (id, show) => {
		const el = document.getElementById(id);
		const input = document.getElementById(id.replace('Error', ''));
		if (el) el.style.display = show ? 'block' : 'none';
		if (input) {
			input.setAttribute('aria-invalid', show ? 'true' : 'false');
			input.style.borderColor = show ? '#e74c3c' : '#ddd';
		}
	};

	// Name validation
	const name = document.getElementById('name');
	if (name.value.trim() === '') {
		showError('nameError', true);
		isValid = false;
	} else {
		showError('nameError', false);
	}

	// Email validation
	const email = document.getElementById('email');
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email.value)) {
		showError('emailError', true);
		isValid = false;
	} else {
		showError('emailError', false);
	}

	// Phone validation
	const phone = document.getElementById('phone');
	const phoneRegex = /^[\d\s\-\(\)]+$/;
	if (!phoneRegex.test(phone.value)) {
		showError('phoneError', true);
		isValid = false;
	} else {
		showError('phoneError', false);
	}

	// Shoot type validation
	const shootType = document.getElementById('shoot-type');
	if (shootType.value === '') {
		showError('shootTypeError', true);
		isValid = false;
	} else {
		showError('shootTypeError', false);
	}

	// Date validation
	const preferredDate = document.getElementById('preferred-date');
	if (preferredDate.value === '') {
		showError('preferredDateError', true);
		isValid = false;
	} else {
		showError('preferredDateError', false);
	}

	// Location validation
	const location = document.getElementById('location');
	if (location.value.trim() === '') {
		showError('locationError', true);
		isValid = false;
	} else {
		showError('locationError', false);
	}

	if (isValid) {
		// Show loading state
		const submitBtn = form.querySelector('.submit-btn');
		const originalBtnText = submitBtn.textContent;
		submitBtn.textContent = "Sending...";
		submitBtn.disabled = true;

		const templateParams = {
			name: name.value,
			email: email.value,
			phone: phone.value,
			shoot_type: shootType.value,
			preferred_date: preferredDate.value,
			alternative_date: document.getElementById('alternative-date').value || "Not provided",
			location: location.value,
			notes: document.getElementById('notes').value || "No additional notes"
		};

		emailjs.send('service_0hcl68q', 'template_31tqjn8', templateParams, 'x0pDGPnrMj7xD0fSb')
			.then(function(response) {
				console.log('SUCCESS!', response.status, response.text);
				if (formMessage) {
					formMessage.style.display = 'block';
					formMessage.style.color = '#2193b0';
					formMessage.textContent = 'Thank you for your booking request! I will contact you within 24-48 hours to confirm your booking.';
				}
				form.reset();
				// Reset visual state of inputs
				form.querySelectorAll('input, select, textarea').forEach(input => {
					input.style.borderColor = '#ddd';
					input.setAttribute('aria-invalid', 'false');
				});
			}, function(error) {
				console.log('FAILED...', error);
				if (formMessage) {
					formMessage.style.display = 'block';
					formMessage.style.color = '#d32f2f';
					formMessage.textContent = 'There was an error sending your booking request. Please try again or contact me directly.';
				}
			})
			.finally(function() {
				submitBtn.textContent = originalBtnText;
				submitBtn.disabled = false;
			});
	} else {
		// Focus first invalid element
		const firstInvalid = form.querySelector('[aria-invalid="true"]');
		if (firstInvalid) firstInvalid.focus();
	}
}

document.addEventListener('DOMContentLoaded', function() {
	initMobileMenu();

	const contactForm = document.getElementById('contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', handleFormSubmit);
	}

	const bookingForm = document.getElementById('booking-form');
	if (bookingForm) {
		bookingForm.addEventListener('submit', handleBookingSubmit);

		// Clear validation errors on input
		const inputs = bookingForm.querySelectorAll('input, textarea, select');
		inputs.forEach(input => {
			input.addEventListener('input', function() {
				const errorId = this.id + 'Error';
				const errorElement = document.getElementById(errorId);
				if (errorElement) errorElement.style.display = 'none';
				this.style.borderColor = '#ddd';
				this.setAttribute('aria-invalid', 'false');
			});
		});
	}
});
