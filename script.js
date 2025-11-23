// ===== NAVBAR FUNCTIONALITY =====
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile menu
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active navigation link on scroll
const sections = document.querySelectorAll("section");

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ===== SMOOTH SCROLLING =====
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const scrollAnimateElements = document.querySelectorAll(".scroll-animate");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

scrollAnimateElements.forEach((element) => {
  scrollObserver.observe(element);
});

// ===== TESTIMONIAL CAROUSEL =====
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carouselDots = document.getElementById("carouselDots");

let currentSlide = 0;
let autoPlayInterval;

// Create dots
testimonialSlides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  carouselDots.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(n) {
  // Remove active class from all slides and dots
  testimonialSlides.forEach((slide) => {
    slide.classList.remove("active");
  });
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Wrap around if needed
  if (n >= testimonialSlides.length) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = testimonialSlides.length - 1;
  } else {
    currentSlide = n;
  }

  // Show current slide and dot
  testimonialSlides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(n) {
  showSlide(n);
  resetAutoPlay();
}

// Auto play
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Event listeners
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoPlay();
});

// Start auto play
startAutoPlay();

// Pause auto play on hover
const carouselContainer = document.querySelector(".testimonial-carousel");
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(autoPlayInterval);
});

carouselContainer.addEventListener("mouseleave", () => {
  startAutoPlay();
});

// ===== FORM VALIDATION =====
const bookingForm = document.getElementById("bookingForm");
const successMessage = document.getElementById("successMessage");

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (Indonesian format)
const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;

function showError(inputId, message) {
  const errorElement = document.getElementById(`${inputId}Error`);
  const inputElement = document.getElementById(inputId);

  errorElement.textContent = message;
  inputElement.style.borderColor = "#e74c3c";
}

function clearError(inputId) {
  const errorElement = document.getElementById(`${inputId}Error`);
  const inputElement = document.getElementById(inputId);

  errorElement.textContent = "";
  inputElement.style.borderColor = "#dee2e6";
}

function validateForm() {
  let isValid = true;

  // Clear all errors first
  [
    "name",
    "email",
    "phone",
    "from",
    "to",
    "vehicle",
    "date",
    "participants",
  ].forEach(clearError);

  // Validate name
  const name = document.getElementById("name").value.trim();
  if (name === "") {
    showError("name", "Nama lengkap wajib diisi");
    isValid = false;
  } else if (name.length < 3) {
    showError("name", "Nama minimal 3 karakter");
    isValid = false;
  }

  // Validate email
  const email = document.getElementById("email").value.trim();
  if (email === "") {
    showError("email", "Email wajib diisi");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError("email", "Format email tidak valid");
    isValid = false;
  }

  // Validate phone
  const phone = document.getElementById("phone").value.trim();
  if (phone === "") {
    showError("phone", "Nomor telepon wajib diisi");
    isValid = false;
  } else if (!phoneRegex.test(phone)) {
    showError(
      "phone",
      "Format nomor telepon tidak valid (contoh: 08123456789)"
    );
    isValid = false;
  }

  // Validate from (kota asal)
  const from = document.getElementById("from").value;
  if (from === "") {
    showError("from", "Pilih kota asal");
    isValid = false;
  }

  // Validate to (kota tujuan)
  const to = document.getElementById("to").value;
  if (to === "") {
    showError("to", "Pilih kota tujuan");
    isValid = false;
  } else if (from !== "" && from === to) {
    showError("to", "Kota tujuan harus berbeda dengan kota asal");
    isValid = false;
  }

  // Validate vehicle
  const vehicle = document.getElementById("vehicle").value;
  if (vehicle === "") {
    showError("vehicle", "Pilih jenis kendaraan");
    isValid = false;
  }

  // Validate date
  const date = document.getElementById("date").value;
  if (date === "") {
    showError("date", "Tanggal keberangkatan wajib diisi");
    isValid = false;
  } else {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      showError("date", "Tanggal tidak boleh kurang dari hari ini");
      isValid = false;
    }
  }

  // Validate participants
  const participants = document.getElementById("participants").value;
  if (participants === "" || participants < 1) {
    showError("participants", "Jumlah peserta minimal 1 orang");
    isValid = false;
  } else if (participants > 50) {
    showError("participants", "Jumlah peserta maksimal 50 orang");
    isValid = false;
  }

  return isValid;
}

// Real-time validation
document.getElementById("name").addEventListener("blur", function () {
  const value = this.value.trim();
  if (value === "") {
    showError("name", "Nama lengkap wajib diisi");
  } else if (value.length < 3) {
    showError("name", "Nama minimal 3 karakter");
  } else {
    clearError("name");
  }
});

document.getElementById("email").addEventListener("blur", function () {
  const value = this.value.trim();
  if (value === "") {
    showError("email", "Email wajib diisi");
  } else if (!emailRegex.test(value)) {
    showError("email", "Format email tidak valid");
  } else {
    clearError("email");
  }
});

document.getElementById("phone").addEventListener("blur", function () {
  const value = this.value.trim();
  if (value === "") {
    showError("phone", "Nomor telepon wajib diisi");
  } else if (!phoneRegex.test(value)) {
    showError(
      "phone",
      "Format nomor telepon tidak valid (contoh: 08123456789)"
    );
  } else {
    clearError("phone");
  }
});

// Form submission
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    // Simulate form submission
    const formData = new FormData(bookingForm);

    // Here you would typically send the data to a server
    console.log("Form Data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Show success message
    bookingForm.style.display = "none";
    successMessage.classList.add("show");

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    // Reset form after 5 seconds
    setTimeout(() => {
      bookingForm.reset();
      bookingForm.style.display = "block";
      successMessage.classList.remove("show");

      // Clear all errors
      [
        "name",
        "email",
        "phone",
        "from",
        "to",
        "vehicle",
        "date",
        "participants",
      ].forEach(clearError);
    }, 5000);
  }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== SET MINIMUM DATE FOR BOOKING =====
const dateInput = document.getElementById("date");
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const year = tomorrow.getFullYear();
const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
const day = String(tomorrow.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;

// ===== SCROLL INDICATOR CLICK =====
const scrollIndicator = document.querySelector(".scroll-indicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    const firstSection = document.querySelector("#layanan");
    if (firstSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = firstSection.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ===== DESTINATION CARD BOOKING BUTTON =====
const destinationBookingBtns = document.querySelectorAll(
  ".destination-overlay .btn"
);
destinationBookingBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = bookingSection.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString("id-ID");
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString("id-ID");
      if (target >= 1000) {
        element.textContent = (target / 1000).toFixed(0) + "K+";
      } else {
        element.textContent = target + "+";
      }
    }
  };

  updateCounter();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          if (!counter.classList.contains("counted")) {
            counter.classList.add("counted");
            animateCounter(counter);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".company-stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log(
  "%c🚌 PT Travel BangKi Nusantara 🚌",
  "color: #d4af37; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cTransportasi Lintas Sumatra Terpercaya Sejak 2015",
  "color: #1a2332; font-size: 14px;"
);
console.log(
  "%cPerjalanan nyaman dan aman di seluruh Pulau Sumatra!",
  "color: #2c3e50; font-size: 12px;"
);
