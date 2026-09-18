/* ==========================================================================
   script.js — vanilla JS behaviour. No frameworks, no bundlers.
   --------------------------------------------------------------------------
   Separation of concerns: each feature is an isolated module object with
   a single responsibility and its own init(). App.init() wires them up.

     Storage         -> safe localStorage read/write (private-mode proof)
     ThemeManager    -> dark / light mode (prefers-color-scheme + override)
     LanguageManager -> EN/AR switching via data-i18n + translations.js
     ScrollReveal    -> IntersectionObserver fade/slide-up on .reveal
     PathsTabs       -> accessible tab switching for #paths
     FaqAccordion    -> single-open animated accordion
     MobileMenu      -> hamburger open/close for small screens
     BookingForm     -> demo-only submit handler (backend comes later)
     FooterMeta      -> dynamic copyright year

   Conventions: `const` for stable references, `let` only for values that
   genuinely reassign (e.g. tab focus target). No legacy declarations. Arrow
   for short callbacks, named functions for module methods.
   ========================================================================== */
"use strict";

/* ---------- Shared constants (never reassigned -> const) ---------- */
const THEME_KEY = "quran-teacher-theme"; // "light" | "dark"
const LANG_KEY = "quran-teacher-lang"; // "en" | "ar"
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Concern: safe persistent storage ---------- */
const Storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null; // private mode / storage blocked
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore — site still works, choice just won't persist */
    }
  },
};

/* ---------- Concern: dark / light theme (LIGHT is the default;
   dark activates only via the toggle and persists) ---------- */
const ThemeManager = {
  root: document.documentElement,
  toggleBtn: document.getElementById("themeToggle"),

  getPreferred() {
    const saved = Storage.get(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  },

  apply(theme) {
    this.root.setAttribute("data-theme", theme);
    if (this.toggleBtn) this.toggleBtn.setAttribute("aria-pressed", String(theme === "dark"));
  },

  set(theme) {
    this.apply(theme);
    Storage.set(THEME_KEY, theme);
  },

  toggle() {
    const next = this.root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    // CSS transitions on body/cards already cross-fade the colours.
    this.set(next);
  },

  init() {
    this.apply(this.getPreferred());
    this.toggleBtn?.addEventListener("click", () => this.toggle());
  },
};

/* ---------- Concern: bilingual EN/AR switching ---------- */
const LanguageManager = {
  root: document.documentElement,
  toggleBtn: document.getElementById("langToggle"),
  label: null,
  current: "en", // the only `let`-style mutable state here (reassigned on switch)

  getInitial() {
    const saved = Storage.get(LANG_KEY);
    if (saved === "en" || saved === "ar") return saved;
    // Gentle auto-detect: Arabic browser -> Arabic, otherwise English.
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("ar") ? "ar" : "en";
  },

  pick(lang) {
    return window.translations?.[lang] ?? {};
  },

  // data-i18n      -> textContent (plain strings)
  // data-i18n-html  -> innerHTML (strings containing accent markup like <em>)
  // data-i18n-ph    -> placeholder attribute
  // data-i18n-aria  -> aria-label attribute
  applyStrings(lang) {
    const strings = this.pick(lang);
    const fallback = this.pick("en");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = strings[key] ?? fallback[key];
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const value = strings[key] ?? fallback[key];
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      const value = strings[key] ?? fallback[key];
      if (value !== undefined) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const value = strings[key] ?? fallback[key];
      if (value !== undefined) el.setAttribute("aria-label", value);
    });
  },

  paint(lang) {
    this.current = lang;
    this.root.setAttribute("lang", lang);
    this.root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.title =
      lang === "ar"
        ? "مُعلِّم القرآن — دروس قرآن عن بُعد"
        : "Quran Teacher — Online Quran Lessons";
    // Toggle button always offers the *other* language.
    if (this.label) this.label.textContent = lang === "ar" ? "EN" : "عربي";
    this.applyStrings(lang);
  },

  set(lang, { animate = true } = {}) {
    if (animate && !REDUCED_MOTION) {
      // Soft cross-fade while text swaps (see body.is-switching in CSS).
      document.body.classList.add("is-switching");
      setTimeout(() => {
        this.paint(lang);
        document.body.classList.remove("is-switching");
      }, 180);
    } else {
      this.paint(lang);
    }
    Storage.set(LANG_KEY, lang);
  },

  getCurrent() {
    return this.current;
  },

  init() {
    this.label = this.toggleBtn?.querySelector(".toggle-label") ?? null;
    this.paint(this.getInitial());
    this.toggleBtn?.addEventListener("click", () => {
      this.set(this.current === "ar" ? "en" : "ar");
    });
  },
};

/* ---------- Concern: scroll-triggered reveal animation ---------- */
const ScrollReveal = {
  init() {
    const els = document.querySelectorAll(".reveal");

    if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Stagger grouped children for a calm cascade (capped at 280ms).
    document.querySelectorAll(".card-grid, .steps, .stat-row").forEach((group) => {
      [...group.children].forEach((child, i) => {
        child.style.setProperty("--reveal-delay", `${Math.min(i * 70, 280)}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // reveal once
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => observer.observe(el));
  },
};

/* ---------- Concern: learning-path tabs ---------- */
const PathsTabs = {
  init() {
    const buttons = [...document.querySelectorAll(".tab-btn")];
    const panels = [...document.querySelectorAll(".tab-panel")];
    if (buttons.length === 0) return;

    const select = (activeBtn) => {
      buttons.forEach((btn) => {
        const active = btn === activeBtn;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
        btn.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        const show = panel.id === activeBtn.getAttribute("aria-controls");
        panel.classList.toggle("is-active", show);
        panel.toggleAttribute("hidden", !show);
      });
    };

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => select(btn));
      btn.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = buttons[(index + 1) % buttons.length];
        if (e.key === "ArrowLeft") next = buttons[(index - 1 + buttons.length) % buttons.length];
        if (next) {
          e.preventDefault();
          select(next);
          next.focus();
        }
      });
    });
  },
};

/* ---------- Concern: FAQ accordion (single-open, animated) ---------- */
const FaqAccordion = {
  CLOSE_MS: 260,
  OPEN_MS: 300,

  close(item) {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;

    item.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");

    if (REDUCED_MOTION) {
      panel.setAttribute("hidden", "");
      panel.style.maxHeight = "";
      return;
    }
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    requestAnimationFrame(() => {
      panel.style.maxHeight = "0px";
      panel.style.overflow = "hidden";
    });
    setTimeout(() => {
      panel.setAttribute("hidden", "");
      panel.style.maxHeight = "";
      panel.style.overflow = "";
    }, this.CLOSE_MS);
  },

  open(item) {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!btn || !panel) return;

    item.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");

    if (REDUCED_MOTION) return;
    panel.style.maxHeight = "0px";
    panel.style.overflow = "hidden";
    requestAnimationFrame(() => {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
    setTimeout(() => {
      panel.style.maxHeight = "";
      panel.style.overflow = "";
    }, this.OPEN_MS);
  },

  init() {
    const items = [...document.querySelectorAll(".faq-item")];
    items.forEach((item) => {
      const btn = item.querySelector(".faq-q");
      const panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;

      panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        items.forEach((other) => {
          if (other !== item && other.classList.contains("open")) this.close(other);
        });
        if (wasOpen) this.close(item);
        else this.open(item);
      });
    });
  },
};

/* ---------- Concern: mobile navigation ---------- */
const MobileMenu = {
  init() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  },
};

/* ---------- Concern: demo booking form (no backend yet) ---------- */
const BookingForm = {
  init() {
    const form = document.getElementById("bookingForm");
    const successBox = document.getElementById("formSuccess");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (successBox) {
        const lang = LanguageManager.getCurrent();
        successBox.textContent =
          LanguageManager.pick(lang).formSuccess ??
          LanguageManager.pick("en").formSuccess ??
          "Thank you!";
        successBox.hidden = false;
        successBox.scrollIntoView({
          behavior: REDUCED_MOTION ? "auto" : "smooth",
          block: "nearest",
        });
      }
      form.reset();
    });
  },
};

/* ---------- Concern: footer metadata ---------- */
const FooterMeta = {
  init() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  },
};

/* ---------- App bootstrap: wire concerns together, nothing else ---------- */
const App = {
  init() {
    ThemeManager.init(); // theme first to avoid a flash of the wrong mode
    LanguageManager.init();
    ScrollReveal.init();
    PathsTabs.init();
    FaqAccordion.init();
    MobileMenu.init();
    BookingForm.init();
    FooterMeta.init();
  },
};

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", () => App.init())
  : App.init();
