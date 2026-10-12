/* Main interactions: smooth scroll, nav, reveals, counters, magnetic buttons, clock */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Lenis smooth scroll ---------- */
  var lenis = null;
  if (!prefersReduced && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* anchor links via lenis */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Nav state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el, i) {
      el.setAttribute("data-delay", String(i % 3));
      io.observe(el);
    });
  }

  /* ---------- Hero intro: stagger lines ---------- */
  var heroBits = document.querySelectorAll(".hero .reveal");
  heroBits.forEach(function (el, i) {
    setTimeout(function () { el.classList.add("in"); }, 120 + i * 110);
  });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var formatK = el.getAttribute("data-format") === "k";
    var dur = 1600, start = null;
    function fmt(v) {
      if (formatK && v >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "k";
      return v.toFixed(decimals);
    }
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    if (prefersReduced) { el.textContent = fmt(target); return; }
    requestAnimationFrame(step);
  }
  var statIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { animateCount(en.target); statIO.unobserve(en.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-num").forEach(function (el) { statIO.observe(el); });

  /* ---------- Magnetic buttons (desktop, fine pointer) ---------- */
  if (window.matchMedia("(pointer: fine)").matches && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var strength = 22;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x / r.width * strength + "px," + y / r.height * strength + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Local time in Mardan ---------- */
  var timeEl = document.getElementById("localTime");
  if (timeEl) {
    function tick() {
      try {
        timeEl.textContent = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi"
        }).format(new Date()) + " PKT";
      } catch (e) { timeEl.textContent = ""; }
    }
    tick(); setInterval(tick, 30000);
  }

  /* ---------- Video: don't fight data-saver ---------- */
  var vid = document.querySelector(".hero-video");
  if (vid) {
    vid.addEventListener("error", function () { vid.style.display = "none"; });
    if (prefersReduced) { vid.removeAttribute("autoplay"); vid.pause(); }
  }
})();
