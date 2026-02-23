/**
 * Meridian Built - Main JavaScript
 */

(function () {
  "use strict";

  /**
   * Form Validation
   */
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const fields = [name, email, message];
      let valid = true;

      // Reset state
      fields.forEach((f) => f.classList.remove("is-invalid", "is-valid"));
      successMsg.classList.add("d-none");

      // Validate each field
      if (name.value.trim().length < 2) {
        name.classList.add("is-invalid");
        valid = false;
      } else {
        name.classList.add("is-valid");
      }

      if (!emailRe.test(email.value.trim())) {
        email.classList.add("is-invalid");
        valid = false;
      } else {
        email.classList.add("is-valid");
      }

      if (message.value.trim().length < 10) {
        message.classList.add("is-invalid");
        valid = false;
      } else {
        message.classList.add("is-valid");
      }

      if (valid) {
        successMsg.classList.remove("d-none");
        form.reset();
        fields.forEach((f) => f.classList.remove("is-valid"));
      } else {
        // Move focus to first invalid field for accessibility
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  /**
   * Anchor Navigation with Fixed Navbar Offset
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
        // Wait for menu to close before scrolling
        setTimeout(() => {
          scrollToTarget(targetId);
        }, 350);
      } else {
        scrollToTarget(targetId);
      }

      function scrollToTarget(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Get the actual navbar height (in case it changed on mobile)
          const navbar = document.querySelector(".navbar");
          const navbarHeight = navbar ? navbar.offsetHeight : 64;

          // Additional offset for services section in mobile view to prevent navbar from covering content
          let extraOffset = 0;
          if (targetId === "services" && window.innerWidth <= 991.98) {
            extraOffset = 40;
          }

          // Get the scroll-margin-top of the target element
          const scrollMarginTop =
            parseInt(getComputedStyle(targetElement).scrollMarginTop) || 0;

          // Calculate position to scroll to (subtract extra to scroll further down for more clearance)
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight -
            scrollMarginTop -
            extraOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
})();
