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
     BillingOptions  -> pricing frequency/format pills (preference only)
     BookingForm     -> Formspree booking submit with status line
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
    const notify = () => window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
    if (animate && !REDUCED_MOTION) {
      // Soft cross-fade while text swaps (see body.is-switching in CSS).
      document.body.classList.add("is-switching");
      setTimeout(() => {
        this.paint(lang);
        document.body.classList.remove("is-switching");
        notify();
      }, 180);
    } else {
      this.paint(lang);
      notify();
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

/* ---------- Concern: pricing schedule selectors ----------
   Frequency (1/2/3x per week) and format (1-on-1 / small group) are
   preference pills only — they shape the summary line, never the rate. */
const BillingOptions = {
  groups: [],
  summary: null,

  paintGroup(group) {
    group.pills.forEach((pill) => {
      const on = pill === group.selected;
      pill.classList.toggle("is-selected", on);
      pill.setAttribute("aria-checked", String(on));
      pill.tabIndex = on ? 0 : -1;
    });
  },

  select(group, pill, focus = false) {
    group.selected = pill;
    this.paintGroup(group);
    this.render();
    if (focus) pill.focus();
  },

  render() {
    if (!this.summary) return;
    const lang = LanguageManager.getCurrent();
    const t = (key) => LanguageManager.pick(lang)[key] ?? LanguageManager.pick("en")[key] ?? "";
    const freq = this.groups[0] ? t(this.groups[0].selected.dataset.value) : "";
    const fmt = this.groups[1] ? t(this.groups[1].selected.dataset.value) : "";
    this.summary.textContent = t("billingSummary")
      .replace("{freq}", freq)
      .replace("{format}", fmt);
  },

  init() {
    this.summary = document.getElementById("billingSummary");
    document.querySelectorAll(".pill-group").forEach((root) => {
      const pills = [...root.querySelectorAll(".pill")];
      if (pills.length === 0) return;
      const group = {
        root,
        pills,
        selected: pills.find((p) => p.classList.contains("is-selected")) ?? pills[0],
      };
      pills.forEach((pill, i) => {
        pill.addEventListener("click", () => this.select(group, pill));
        pill.addEventListener("keydown", (e) => {
          let next = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = pills[(i + 1) % pills.length];
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = pills[(i - 1 + pills.length) % pills.length];
          if (next) {
            e.preventDefault();
            this.select(group, next, true);
          }
        });
      });
      this.paintGroup(group);
      this.groups.push(group);
    });
    window.addEventListener("langchange", () => this.render());
    this.render();
  },
};

/* ---------- Concern: booking form (Formspree) ----------
   Posts to the form's `action` URL. While the action still holds the
   [FORMSPREE_ENDPOINT] placeholder, submissions are simulated locally
   so the page never hits the network. */
const BookingForm = {
  form: null,
  status: null,
  submitBtn: null,
  lastKind: null, // 'sending' | 'ok' | 'err' — re-translated on langchange

  endpoint() {
    return this.form?.getAttribute("action") ?? "";
  },

  isPlaceholder() {
    return this.endpoint().includes("[FORMSPREE_ENDPOINT]");
  },

  text(key) {
    const lang = LanguageManager.getCurrent();
    return LanguageManager.pick(lang)[key] ?? LanguageManager.pick("en")[key] ?? "";
  },

  show(kind) {
    this.lastKind = kind;
    if (!this.status) return;
    const key = kind === "ok" ? "formSuccess" : kind === "err" ? "formError" : "formSending";
    this.status.textContent = this.text(key);
    this.status.dataset.kind = kind;
    this.status.hidden = false;
  },

  init() {
    this.form = document.getElementById("bookingForm");
    if (!this.form) return;
    this.status = document.getElementById("formStatus");
    this.submitBtn = this.form.querySelector('[type="submit"]');

    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }
      this.show("sending");
      if (this.submitBtn) this.submitBtn.disabled = true;
      try {
        if (this.isPlaceholder()) {
          // Placeholder endpoint: simulate a send, no network traffic.
          await new Promise((resolve) => setTimeout(resolve, REDUCED_MOTION ? 60 : 700));
        } else {
          const res = await fetch(this.endpoint(), {
            method: "POST",
            body: new FormData(this.form),
            headers: { Accept: "application/json" },
          });
          if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
        }
        this.show("ok");
        this.form.reset();
        this.status.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "nearest" });
      } catch {
        this.show("err");
      } finally {
        if (this.submitBtn) this.submitBtn.disabled = false;
      }
    });

    // Keep a visible status line in the current language.
    window.addEventListener("langchange", () => {
      if (this.lastKind && this.status && !this.status.hidden) this.show(this.lastKind);
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
    BillingOptions.init();
    BookingForm.init();
    FooterMeta.init();
  },
};

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", () => App.init())
  : App.init();
