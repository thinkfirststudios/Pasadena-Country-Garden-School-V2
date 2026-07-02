/* Pasadena Country Garden School — interactions */
(function () {
  "use strict";

  /* --- Sticky header shadow on scroll --- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Mobile nav toggle --- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is clicked (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 980) {
          links.classList.remove("is-open");
          toggle.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* --- Scroll reveal --- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --- Placeholder images (demo stock, themed by caption text) ----------
     Fills every .imgph box and hero/pagehero background with a themed photo.
     If a photo fails to load, the styled hatch placeholder shows instead.
     To use real photos: drop <img> into the .imgph (or set --img on the
     hero) and this auto-fill skips it.                                     */
  var STOCK = "https://loremflickr.com/800/600/";
  var TAG_MAP = [
    [/breakfast|snack|lunch|meal|food|baking|eat|spread/, "healthy,food"],
    [/garden bed|planting|seeds|soil|harvest|vegetable|garden play|garden|beds/, "garden,vegetables"],
    [/flower|bloom|butterfl|bug|insect|seasonal/, "flowers,nature"],
    [/treehouse/, "treehouse,garden"],
    [/classroom|circle|story|art|craft|music|rest|nap|entrance|gate|welcome|school/, "kindergarten,classroom"],
    [/play|outdoor|sensory|water|toys|nature walk|park/, "playground,park"],
    [/child|children|camper|kids|happy|collage/, "children,playground"]
  ];
  var tagsFor = function (text) {
    var t = (text || "").toLowerCase();
    for (var i = 0; i < TAG_MAP.length; i++) { if (TAG_MAP[i][0].test(t)) return TAG_MAP[i][1]; }
    return "garden,green,plants";
  };
  var cleanAlt = function (text) {
    return (text || "Photo").replace(/^\s*\[image:\s*/i, "").replace(/\]\s*$/, "").trim() || "Photo";
  };
  var stockUrl = function (text, lock) {
    return STOCK + encodeURIComponent(tagsFor(text)) + "?lock=" + lock;
  };

  document.querySelectorAll(".imgph").forEach(function (ph, i) {
    if (ph.closest(".lightbox") || ph.querySelector("img")) return;
    var span = ph.querySelector("span");
    var label = span ? span.textContent : "";
    var img = document.createElement("img");
    img.src = stockUrl(label, i + 1);
    img.alt = cleanAlt(label);
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", function () { img.remove(); });
    ph.appendChild(img);
  });

  document.querySelectorAll(".hero__bg, .pagehero__bg").forEach(function (el, i) {
    var raw = el.getAttribute("style") || "";
    var m = raw.match(/\[IMAGE:[^\]]*\]/i);
    var label = m ? m[0] : (el.getAttribute("aria-label") || "garden");
    el.style.setProperty("--img", "url('" + stockUrl(label, 200 + i) + "')");
  });

  /* --- Lightbox (gallery + moments) --- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbPh = lightbox.querySelector(".imgph");
    var lbSpan = lightbox.querySelector(".imgph span");
    var lbCaption = lightbox.querySelector(".lightbox__caption");
    var openLightbox = function (src, caption) {
      if (lbPh) {
        var img = lbPh.querySelector("img");
        if (src) {
          if (!img) { img = document.createElement("img"); lbPh.appendChild(img); }
          img.src = src; img.style.display = "";
          if (lbSpan) lbSpan.style.display = "none";
        } else {
          if (img) img.style.display = "none";
          if (lbSpan) lbSpan.style.display = "";
        }
      }
      if (lbCaption) lbCaption.textContent = caption || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    var closeLightbox = function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    document.querySelectorAll("[data-lightbox]").forEach(function (el) {
      el.addEventListener("click", function () {
        var img = el.querySelector("img");
        var span = el.querySelector(".imgph span");
        var cap = el.getAttribute("data-caption") || (span ? cleanAlt(span.textContent) : "");
        openLightbox(img ? img.src : "", cap);
      });
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox__close")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* --- Forms: friendly stub (no backend on static build) --- */
  document.querySelectorAll("form[data-stub]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "🌿 Thank you! This is a demo form — connect it to Brightwheel or email before launch.";
        note.style.display = "block";
      }
      form.reset();
    });
  });

  /* --- Footer year --- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
