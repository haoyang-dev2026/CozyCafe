
// =========================
// 1. MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close menu after clicking a navigation link

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// =========================
// 2. AUTOMATIC COPYRIGHT YEAR
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();


// =========================
// 3. SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    ".about-content, .about-image, .section-heading, " +
    ".menu-card, .atmosphere-content, .atmosphere-image, " +
    ".contact-grid > div"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

}


// =========================
// 4. BACK TO TOP BUTTON
// =========================

const backToTop = document.getElementById("backToTop");

// Show button when scrolling down

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

// Scroll back to top when clicked

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================
// 5. CONTACT FORM VALIDATION
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing

    event.preventDefault();

    // Get user input

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check empty fields

    if (name === "" || email === "" || message === "") {

        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";

        return;
    }

    // Check email format

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "red";

        return;
    }


    // =========================
    // 6. WHATSAPP INTEGRATION
    // =========================

    // Cafe WhatsApp number (Malaysia)

    const phoneNumber = "60192921240";

    // Prepare WhatsApp message

    const whatsappMessage =
        "Hello Cozy Cafe!\n\n" +
        "My name is " + name + ".\n" +
        "Email: " + email + "\n\n" +
        "Message: " + message;

    // Create WhatsApp URL

    const whatsappURL =
        "https://wa.me/" + phoneNumber +
        "?text=" + encodeURIComponent(whatsappMessage);

    // Open WhatsApp

    window.open(whatsappURL, "_blank");

    // Show confirmation message

    formMessage.textContent =
        "Opening WhatsApp... Please send your message there.";

    formMessage.style.color = "green";

    // Clear form

    contactForm.reset();

});
