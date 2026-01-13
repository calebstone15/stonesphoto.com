console.log("Stones Photos site loaded!");

const EMAIL_CONFIG = {
    SERVICE_ID: "service_0hcl68q",
    TEMPLATE_ID: "template_3codtcb",
    BOOKING_TEMPLATE_ID: "template_31tqjn8",
    PUBLIC_KEY: "x0pDGPnrMj7xD0fSb"
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

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formMessage = document.getElementById('form-message');

    // Disable button to prevent multiple submissions
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value.trim()
    };

    // Pass public key as 4th arg as a fallback in case init wasn't effective
    emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, formData, EMAIL_CONFIG.PUBLIC_KEY)
        .then(function() {
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#2193b0';
                formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
            }
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        }, function(error) {
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#d32f2f';
                formMessage.textContent = 'Failed to send message. Please try again or contact me directly.';
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
            console.error('EmailJS error:', error);
        });
}

function handleBookingSubmit(event) {
    event.preventDefault();
    console.log("Booking form submitted, running validation");

    const form = event.target;
    let isValid = true;

    // Helper to show/hide error
    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.style.display = show ? 'block' : 'none';
    };
    const setBorder = (el, isError) => {
        if (el) el.style.borderColor = isError ? '#e74c3c' : '#ddd';
    };

    // Name validation
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        showError('nameError', true);
        setBorder(name, true);
        isValid = false;
    } else {
        showError('nameError', false);
        setBorder(name, false);
    }

    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError('emailError', true);
        setBorder(email, true);
        isValid = false;
    } else {
        showError('emailError', false);
        setBorder(email, false);
    }

    // Phone validation
    const phone = document.getElementById('phone');
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(phone.value)) {
        showError('phoneError', true);
        setBorder(phone, true);
        isValid = false;
    } else {
        showError('phoneError', false);
        setBorder(phone, false);
    }

    // Shoot type validation
    const shootType = document.getElementById('shoot-type');
    if (shootType.value === '') {
        showError('shootTypeError', true);
        setBorder(shootType, true);
        isValid = false;
    } else {
        showError('shootTypeError', false);
        setBorder(shootType, false);
    }

    // Date validation
    const preferredDate = document.getElementById('preferred-date');
    if (preferredDate.value === '') {
        showError('preferredDateError', true);
        setBorder(preferredDate, true);
        isValid = false;
    } else {
        showError('preferredDateError', false);
        setBorder(preferredDate, false);
    }

    // Location validation
    const location = document.getElementById('location');
    if (location.value.trim() === '') {
        showError('locationError', true);
        setBorder(location, true);
        isValid = false;
    } else {
        showError('locationError', false);
        setBorder(location, false);
    }

    // If all validations pass
    if (isValid) {
        console.log("Validation passed, preparing to send email");
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
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
        emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.BOOKING_TEMPLATE_ID, templateParams, EMAIL_CONFIG.PUBLIC_KEY)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your booking request! I will contact you within 24-48 hours to confirm your booking.');
                form.reset();
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
}

function setupMobileMenu() {
    const menuBtn = document.querySelector('.header-menu-btn');
    const nav = document.querySelector('.header-nav');

    if (menuBtn && nav) {
        menuBtn.onclick = function() {
            nav.classList.toggle('show');
        };

        // Determine breakpoint based on page
        const isPortfolio = window.location.pathname.includes('portfolio.html');
        const breakpoint = isPortfolio ? 1350 : 700;

        // Close menu when clicking a link (on mobile)
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.onclick = () => {
                if (window.innerWidth <= breakpoint) {
                    nav.classList.remove('show');
                }
            };
        });
    }
}

function setupGalleryNavigation() {
    const galleryNavs = document.querySelectorAll('.gallery-nav');
    if (galleryNavs.length === 0) return;

    galleryNavs.forEach(nav => {
        const galleryId = nav.dataset.gallery;
        const grid = document.getElementById(`${galleryId}-grid`);
        const pageIndicator = nav.querySelector('.current-page');
        let currentPage = 1;

        if (!grid || !pageIndicator) return;

        // Show/hide gallery items based on page
        function showPage(page) {
            grid.querySelectorAll('.gallery-item').forEach(item => {
                if (parseInt(item.dataset.page) === page) {
                    item.style.display = '';

                    // Prioritize loading these images
                    const img = item.querySelector('img');
                    if (img && img.hasAttribute('loading')) {
                        img.removeAttribute('loading');
                    }

                    // Trigger animation after a small delay
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                } else {
                    item.classList.remove('visible');
                    item.style.display = 'none';
                }
            });
            pageIndicator.textContent = page;
        }

        // Next page button
        const nextBtn = nav.querySelector('.next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = parseInt(nav.querySelector('.total-pages').textContent);
                currentPage = currentPage < totalPages ? currentPage + 1 : 1;
                showPage(currentPage);
            });
        }

        // Previous page button
        const prevBtn = nav.querySelector('.prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const totalPages = parseInt(nav.querySelector('.total-pages').textContent);
                currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
                showPage(currentPage);
            });
        }

        // Initialize first page with animation
        showPage(1);
    });
}

function setupImageOptimization() {
    // Handle image loading and optimization
    document.querySelectorAll('.optimized-image').forEach(img => {
        // Remove loading class when image is loaded
        img.onload = function() {
            if (this.parentElement) {
                this.parentElement.classList.remove('loading');
            }
        };

        // If image fails to load, try a fallback approach
        img.onerror = function() {
            // If srcset loading fails, try direct loading with reduced quality
            if (this.src.indexOf('?width=') === -1) {
                this.src = this.src + '?quality=80&width=800';
            }
        };
    });

    // Lazy load images for later pages
    function lazyLoadGalleryImages() {
        document.querySelectorAll('.gallery-item[data-page]:not([data-page="1"])').forEach(item => {
            const img = item.querySelector('img');
            if (img && !img.dataset.lazyLoaded) {
                // Set src attribute only when nearing viewport
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight * 1.5) {
                     img.setAttribute('loading', 'lazy');
                     img.dataset.lazyLoaded = 'true';
                }
            }
        });
    }

    if (document.querySelector('.gallery-item')) {
        // Call lazy load on scroll and resize
        window.addEventListener('scroll', lazyLoadGalleryImages);
        window.addEventListener('resize', lazyLoadGalleryImages);

        // Initial call for images that might be visible
        lazyLoadGalleryImages();
    }
}

function setupScrollAnimation() {
    function checkScroll() {
        const sections = document.querySelectorAll('.gallery-section');

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('visible');
            }
        });
    }

    if (document.querySelector('.gallery-section')) {
        // Check scroll position on load and scroll
        window.addEventListener('load', checkScroll);
        window.addEventListener('scroll', checkScroll);
        // Also call immediately in case already in view
        checkScroll();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);

        // Clear validation errors when user starts typing
        const inputs = bookingForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                    this.style.borderColor = '#ddd';
                }
            });
        });
    }

    setupMobileMenu();
    setupGalleryNavigation();
    setupImageOptimization();
    setupScrollAnimation();
});
