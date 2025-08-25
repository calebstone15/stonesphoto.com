console.log("Stones Photos site loaded!");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

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

            emailjs.send("service_0hcl68q", "template_3codtcb", formData)
                .then(function(response) {
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
        });
    }
});