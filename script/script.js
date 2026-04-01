const cards = document.querySelectorAll(".card-wrap");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

cards.forEach((cardWrap) => {
  const card = cardWrap.querySelector(".card");
  const cardBg = cardWrap.querySelector(".card-bg");

  if (!card || !cardBg || prefersReducedMotion) {
    return;
  }

  cardWrap.addEventListener("mousemove", (e) => {
    const rect = cardWrap.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 15;
    const rotateY = -((x - centerX) / centerX) * -15;

    // Parallax offset for the background image
    const offsetX = -((x - centerX) / centerX) * 20;
    const offsetY = -((y - centerY) / centerY) * 20;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    // Apply parallax shift to background
    cardBg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // shine effect position
    card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
  });

  cardWrap.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    cardBg.style.transform = "translate(0px, 0px)";
  });

});

/* NAV HOME HERO */
(function () {
  var root = document.querySelector(".nav-home-hero-asset");
  if (!root) return;

  var menuTrigger = root.querySelector("#menu-toggle");
  var closeTrigger = root.querySelector("#menu-close");
  var overlay = root.querySelector("#full-menu");

  function setMenuState(isOpen, moveFocus) {
    root.classList.toggle("is-menu-open", isOpen);
    if (overlay) overlay.setAttribute("aria-hidden", String(!isOpen));
    if (menuTrigger) menuTrigger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (moveFocus) {
      if (isOpen && closeTrigger) closeTrigger.focus();
      else if (!isOpen && menuTrigger) menuTrigger.focus();
    }
  }

  if (menuTrigger) {
    menuTrigger.addEventListener("click", function () { setMenuState(true, true); });
    menuTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMenuState(true, true); }
    });
  }

  if (closeTrigger) {
    closeTrigger.addEventListener("click", function () { setMenuState(false, true); });
    closeTrigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMenuState(false, true); }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("is-menu-open")) setMenuState(false, true);
  });

  setMenuState(false);
})();

// Prefetch pages on hover/focus for near-instant navigation
(function () {
  var prefetched = new Set();
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var canPrefetch = true;
  if (connection) {
    var saveData = Boolean(connection.saveData);
    var slowType = typeof connection.effectiveType === "string" && /(^2g$|^slow-2g$)/i.test(connection.effectiveType);
    if (saveData || slowType) canPrefetch = false;
  }
  function prefetch(href) {
    if (!canPrefetch) return;
    if (!href || prefetched.has(href)) return;
    try {
      var url = new URL(href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
    } catch (e) { return; }
    prefetched.add(href);
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
  document.addEventListener('mouseover', function (e) {
    var a = e.target.closest('a[href]');
    if (a) prefetch(a.href);
  });
  document.addEventListener('focusin', function (e) {
    var a = e.target.closest('a[href]');
    if (a) prefetch(a.href);
  });
})();

/* Testimonials slider */
document.addEventListener("DOMContentLoaded", function () {
  var sliderRoot = document.querySelector(".testimonials-slider-wrapper");
  if (!sliderRoot || typeof Swiper === "undefined") {
    return;
  }

  var liveRegion = document.getElementById("swiper-wrapper-f3fbcbe7e663d6f1");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Suppress live-region announcements while autoplay is running */
  if (!reducedMotion && liveRegion) {
    liveRegion.setAttribute("aria-live", "off");
  }

  var swiper = new Swiper(".testimonials-slider-wrapper", {
    navigation: {
      nextEl: ".testimonials-next",
      prevEl: ".testimonials-prev"
    },
    pagination: {
      el: ".testimonials-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<button class="' + className + '" type="button" aria-label="Go to testimonial ' + (index + 1) + '"></button>';
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: false
    },
    effect: "cards",
    grabCursor: true,
    autoplay: reducedMotion
      ? false
      : { delay: 5000, disableOnInteraction: true },
    a11y: {
      enabled: true,
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "First slide",
      lastSlideMessage: "Last slide"
    }
  });

  /* Once the user interacts and autoplay stops, restore polite live announcements */
  swiper.on("autoplayStop", function () {
    if (liveRegion) liveRegion.setAttribute("aria-live", "polite");
  });
});