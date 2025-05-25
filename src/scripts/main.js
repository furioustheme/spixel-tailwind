(function () {
  "use strict";
  // =================
  AOS.init({
    duration: 800,
  });

  // ####################### Testimonial Slider #########################
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-custom-next",
      prevEl: ".swiper-button-custom-prev",
    },
  });

  // ########################## Modal ##############################
  const openModalButtons = document.querySelectorAll("[data-modal-open]");
  const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  function openModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.nextElementSibling;
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      closeModal(modal);
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ########################## Navbar Responsiveness ##########################
  function handleNavbarResize() {
    const navMenu = document.querySelector("#nav-menu");
    if (!navMenu) return; // Safeguard against missing element

    if (window.innerWidth > 1024) {
      navMenu.classList.add("lg:!flex");
    } else {
      navMenu.classList.remove("lg:!flex");
    }
  }

  // Throttle Resize Events
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleNavbarResize, 100); // Throttle calls
  });

  handleNavbarResize();

  // ########################## Navbar Active Link ##########################
  function highlightActiveLink() {
    const navMenuItems = document.querySelectorAll("#nav-menu li a");
    const urlPath = window.location.pathname.replace(/\/$/, "");

    navMenuItems.forEach((item) => {
      const itemPath = item.pathname.replace(/\/$/, "");
      if (urlPath === itemPath || urlPath === `${itemPath}/index.html`) {
        const svg = `
          <svg
            width="53"
            height="6"
            viewBox="0 0 53 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-aos="fade-in"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M52.3074 2.15696C52.0966 1.61074 50.2855 1.38076 44.8425 1.1891C39.7636 1.00703 33.851 0.479972 23.5208 0.767455C15.6246 0.987859 5.79264 1.86948 5.79264 2.3582C5.79264 2.71276 6.17595 2.72234 9.83657 2.40611C13.2193 2.11863 14.9538 2.05155 17.0716 1.97489C8.58123 2.72234 6.77008 3.21107 2.24701 3.68062C-0.589493 3.97769 1.06833 4.83055 2.10327 4.74431C2.11285 4.74431 15.3083 3.67104 16.5541 3.72854C16.6691 3.73812 15.4137 3.91061 13.7559 4.11185C9.12745 4.68681 10.0186 5.64499 13.4876 5.20419C25.1594 3.71886 36.1413 3.25888 44.6029 3.90093C47.2765 4.10217 47.5736 4.10217 47.5736 3.85301C47.5736 3.41221 46.8453 3.07691 45.7049 3.00983C43.9225 2.89483 37.0612 2.56892 33.9564 2.47309C33.7169 2.46351 33.8318 2.28153 34.0427 2.26237C35.3076 2.13779 45.3503 2.23352 49.2985 2.36768C52.202 2.46351 52.4129 2.45402 52.3074 2.15696Z"
              class="fill-primary"
            />
          </svg>`;
        item.insertAdjacentHTML("beforeend", svg); // Append the SVG only once
      }
    });
  }

  highlightActiveLink();

  // =============== Toggle password ==================
  function togglePasswordVisibility(passwordId, eyeIconId) {
    const passwordInput = document.getElementById(passwordId);
    const eyeIcon = document.getElementById(eyeIconId);

    // Toggle password visibility
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    }
  }

  // Add event listeners to toggle buttons
  const passwordToggle = document.getElementById("togglePassword");
  const cpasswordToggle = document.getElementById("cpasswordToggle");

  if (passwordToggle) {
    passwordToggle.addEventListener("click", function () {
      togglePasswordVisibility("password", "eyeIcon");
    });
  }

  if (cpasswordToggle) {
    cpasswordToggle.addEventListener("click", function () {
      togglePasswordVisibility("cpassword", "ceyeIcon");
    });
  }
});

// =============== Toggle bill ====================
let billType = "monthly";

function toggleBilling(clickedButton) {
  const buttons = document.querySelectorAll(".billToggle");

  // Check if the button clicked is the same as the current bill type
  if (billType === clickedButton.dataset.bill) return;

  billType = clickedButton.dataset.bill;

  // Toggle active button class
  buttons.forEach((button) => button.classList.remove("btn-primary"));
  clickedButton.classList.add("btn-primary");

  // Update price values
  const prices = document.querySelectorAll(".price");
  prices.forEach((price) => updatePrice(price, clickedButton.dataset.bill));
}

function updatePrice(priceElement, billType) {
  let priceValue = Number(priceElement.textContent);
  let updatedValue = billType === "monthly" ? priceValue / 12 : priceValue * 12;

  animateValue(priceElement, priceValue, updatedValue, 2000, 2);
}

function animateValue(obj, start, end, duration, decimals) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Number(progress * (end - start) + start).toFixed(decimals);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// =============== Animate number ===================
function animateNumbers() {
  const clientCount = document.querySelector("#client-count");
  const marketCount = document.querySelector("#market-count");

  if (clientCount)
    animateValue(clientCount, 0, Number(clientCount.textContent), 2000, 0);
  if (marketCount)
    animateValue(marketCount, 0, Number(marketCount.textContent), 1000, 0);
}

// Trigger number animations when the DOM is loaded
document.addEventListener("DOMContentLoaded", animateNumbers);

// =============== Animate SVG on scroll ===================
function animateSvgOnScroll() {
  const sections = document.querySelectorAll(".animate-section");

  sections.forEach((section) => {
    const animatedPath = section.querySelector(".animated-path");
    const animatedLine = section.querySelector(".animated-line");
    const animatedPricePath = section.querySelector(".animated-price-path");

    // Check if the elements exist before proceeding
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
      if (animatedPath) animatedPath.classList.add("animate-path-svg");
      if (animatedLine) animatedLine.classList.add("animate-line-svg");
      if (animatedPricePath)
        animatedPricePath.classList.add("animate-price-svg");
    } else {
      if (animatedPath) animatedPath.classList.remove("animate-path-svg");
      if (animatedLine) animatedLine.classList.remove("animate-line-svg");
      if (animatedPricePath)
        animatedPricePath.classList.remove("animate-price-svg");
    }
  });
}

// Trigger scroll-based animation on page scroll
window.addEventListener("scroll", animateSvgOnScroll);

// =============== youtube video =============
function loadYouTubeEmbed(element, videoId = "nJ25yl34Uqw") {
  if (!element) {
    console.error(
      "Error: The element passed to loadYouTubeEmbed is null or undefined.",
    );
    return;
  }

  // Use YouTube's no-cookie domain for the embed
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&si=htgP7XCfxel0pm03`;
  iframe.className = "absolute top-0 left-0 w-full h-full";
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  );
  iframe.setAttribute("allowfullscreen", true);

  const parent = element.parentNode;
  if (!parent) {
    console.error("Error: The element has no parentNode.");
    return;
  }

  parent.innerHTML = "";
  parent.appendChild(iframe);
}
