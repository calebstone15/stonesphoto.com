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

function initMobileMenu() {
    const menuBtn = document.querySelector('.header-menu-btn');
    const nav = document.querySelector('.header-nav');

    if (menuBtn && nav) {
        menuBtn.onclick = function() {
            nav.classList.toggle('show');
        };

        // Close mobile menu on link click
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.onclick = () => {
                nav.classList.remove('show');
            };
        });
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formMessage = document.getElementById('form-message');

    // Disable button to prevent multiple submissions
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
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
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#2193b0';
                formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
            } else {
                alert('Message sent successfully! I’ll get back to you soon.');
            }
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, function(error) {
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#d32f2f';
                formMessage.textContent = 'Failed to send message. Please try again or contact me directly.';
            } else {
                alert('Failed to send message. Please try again or contact me directly.');
            }
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            console.error('EmailJS error:', error);
        });
}

function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Form submitted, running validation");

            let isValid = true;

            // Name validation
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                document.getElementById('nameError').style.display = 'block';
                name.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                document.getElementById('nameError').style.display = 'none';
                name.style.borderColor = '#ddd';
            }

            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').style.display = 'block';
                email.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
                email.style.borderColor = '#ddd';
            }

            // Phone validation
            const phone = document.getElementById('phone');
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(phone.value)) {
                document.getElementById('phoneError').style.display = 'block';
                phone.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                document.getElementById('phoneError').style.display = 'none';
                phone.style.borderColor = '#ddd';
            }

            // Shoot type validation
            const shootType = document.getElementById('shoot-type');
            if (shootType.value === '') {
                document.getElementById('shootTypeError').style.display = 'block';
                shootType.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                document.getElementById('shootTypeError').style.display = 'none';
                shootType.style.borderColor = '#ddd';
            }

            // Date validation
            const preferredDate = document.getElementById('preferred-date');
            if (preferredDate.value === '') {
                document.getElementById('preferredDateError').style.display = 'block';
                preferredDate.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                document.getElementById('preferredDateError').style.display = 'none';
                preferredDate.style.borderColor = '#ddd';
            }

            // Location validation
            const location = document.getElementById('location');
            if (location.value.trim() === '') {
                document.getElementById('locationError').style.display = 'block';
                location.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                document.getElementById('locationError').style.display = 'none';
                location.style.borderColor = '#ddd';
            }

            // If all validations pass
            if (isValid) {
                console.log("Validation passed, preparing to send email");
                // Show loading state
                const submitBtn = bookingForm.querySelector('.submit-btn');
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
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        alert('Thank you for your booking request! I will contact you within 24-48 hours to confirm your booking.');
                        bookingForm.reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                        alert('There was an error sending your booking request. Please try again or contact me directly. Error: ' + (error?.text || 'Unknown error'));
                    })
                    .finally(function() {
                        // Reset button state
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    });
            }
        });

        // Clear validation errors when user starts typing
        const inputs = bookingForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + 'Error';
                // Handle shoot-type and preferred-date variable/id mismatch if any, or just standard naming convention
                let targetErrorId = errorId;
                if (this.id === 'shoot-type') targetErrorId = 'shootTypeError';
                if (this.id === 'preferred-date') targetErrorId = 'preferredDateError';

                const errorElement = document.getElementById(targetErrorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                    this.style.borderColor = '#ddd';
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    initBookingForm();
});
