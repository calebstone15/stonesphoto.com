console.log("Stones Photos site loaded!");

// Configuration
const EMAIL_CONFIG = {
    SERVICE_ID: "service_0hcl68q",
    CONTACT_TEMPLATE_ID: "template_3codtcb",
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

// Mobile Menu Logic
function setupMobileMenu() {
    const menuBtn = document.querySelector('.header-menu-btn');
    const nav = document.querySelector('.header-nav');

    if (menuBtn && nav) {
        menuBtn.onclick = function() {
            nav.classList.toggle('show');
        };

        // Close mobile menu on link click
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.onclick = () => {
                // Check for portfolio page for different breakpoint
                const isPortfolio = window.location.pathname.includes('portfolio.html');
                const breakpoint = isPortfolio ? 1350 : 700;

                if (window.innerWidth <= breakpoint) {
                    nav.classList.remove('show');
                }
            };
        });
    }
}

// Gallery Logic
function setupGallery() {
    // Gallery page navigation
    document.querySelectorAll('.gallery-nav').forEach(nav => {
      const galleryId = nav.dataset.gallery;
      const grid = document.getElementById(`${galleryId}-grid`);
      const pageIndicator = nav.querySelector('.current-page');
      let currentPage = 1;

      // Show/hide gallery items based on page
      function showPage(page) {
        if (!grid) return;

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
        if (pageIndicator) pageIndicator.textContent = page;
      }

      // Next page button
      const nextBtn = nav.querySelector('.next');
      if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            const totalPagesElem = nav.querySelector('.total-pages');
            const totalPages = totalPagesElem ? parseInt(totalPagesElem.textContent) : 1;
            currentPage = currentPage < totalPages ? currentPage + 1 : 1;
            showPage(currentPage);
          });
      }

      // Previous page button
      const prevBtn = nav.querySelector('.prev');
      if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            const totalPagesElem = nav.querySelector('.total-pages');
            const totalPages = totalPagesElem ? parseInt(totalPagesElem.textContent) : 1;
            currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
            showPage(currentPage);
          });
      }

      // Initialize first page with animation
      showPage(1);
    });

    // Handle image loading and optimization
    document.querySelectorAll('.optimized-image').forEach(img => {
        // Remove loading class when image is loaded
        img.onload = function () {
          if (this.parentElement) this.parentElement.classList.remove('loading');
        };

        // If image fails to load, try a fallback approach
        img.onerror = function () {
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
            img.setAttribute('loading', 'lazy');
            img.dataset.lazyLoaded = 'true';
          }
        });
    }

    // Scroll animation - show sections when scrolled into view
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

    // Call lazy load on scroll and resize
    window.addEventListener('scroll', lazyLoadGalleryImages);
    window.addEventListener('resize', lazyLoadGalleryImages);

    // Initial call for images that might be visible
    lazyLoadGalleryImages();

    // Check scroll position on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check immediately too
}

// Form Validation Helpers
function validateInput(input, errorId, validator) {
    const errorElement = document.getElementById(errorId);
    let isValid = true;

    if (validator) {
        isValid = validator(input.value);
    } else {
        isValid = input.value.trim() !== '';
    }

    if (!isValid) {
        if (errorElement) errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
        input.setAttribute('aria-invalid', 'true');
    } else {
        if (errorElement) errorElement.style.display = 'none';
        input.style.borderColor = '#ddd';
        input.setAttribute('aria-invalid', 'false');
    }
    return isValid;
}

function clearValidationOnInput(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            this.style.borderColor = '#ddd';
            this.setAttribute('aria-invalid', 'false');
        });
    });
}

// Contact Form Handler
function handleContactFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formMessage = document.getElementById('form-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Basic Validation (HTML5 'required' handles most, but we can add custom if needed)
    // Here we rely on the visual feedback from HTML5 or assume custom validation is minimal for contact form
    // The previous script didn't have extensive JS validation for contact form, just grabbing values.

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value.trim()
    };

    emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.CONTACT_TEMPLATE_ID, formData, EMAIL_CONFIG.PUBLIC_KEY)
        .then(function() {
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#2193b0';
                formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
                formMessage.setAttribute('role', 'alert');
            }
            form.reset();
        }, function(error) {
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#d32f2f';
                formMessage.textContent = 'Failed to send message. Please try again or contact me directly.';
                formMessage.setAttribute('role', 'alert');
            }
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
}

// Booking Form Handler
function handleBookingFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formMessage = document.getElementById('booking-form-message');

    // Validate
    let isValid = true;

    // Name
    isValid = validateInput(document.getElementById('name'), 'nameError') && isValid;

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = validateInput(document.getElementById('email'), 'emailError', val => emailRegex.test(val)) && isValid;

    // Phone
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    isValid = validateInput(document.getElementById('phone'), 'phoneError', val => phoneRegex.test(val)) && isValid;

    // Shoot type
    isValid = validateInput(document.getElementById('shoot-type'), 'shootTypeError') && isValid;

    // Date
    isValid = validateInput(document.getElementById('preferred-date'), 'preferredDateError') && isValid;

    // Location
    isValid = validateInput(document.getElementById('location'), 'locationError') && isValid;

    if (!isValid) {
        // Focus first invalid element
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

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

    emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.BOOKING_TEMPLATE_ID, templateParams, EMAIL_CONFIG.PUBLIC_KEY)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#2193b0';
                formMessage.textContent = 'Thank you for your booking request! I will contact you within 24-48 hours to confirm your booking.';
                formMessage.setAttribute('role', 'alert');
            }
            form.reset();
        }, function(error) {
            console.log('FAILED...', error);
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#d32f2f';
                formMessage.textContent = 'There was an error sending your booking request. Please try again or contact me directly.';
                formMessage.setAttribute('role', 'alert');
            }
        })
        .finally(function() {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupGallery();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // Add novalidate to disable browser default validation to use our custom validation
        bookingForm.setAttribute('novalidate', true);
        bookingForm.addEventListener('submit', handleBookingFormSubmit);
        clearValidationOnInput(bookingForm);
    }
});
