(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  const progressBar = document.getElementById("scroll-progress-bar");
  const backToTop = document.getElementById("back-to-top");

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.dataset.theme = dark ? "dark" : "light";

    if (themeButton) {
      const icon = themeButton.querySelector(".theme-toggle-icon");
      const label = themeButton.querySelector(".theme-toggle-label");
      themeButton.setAttribute("aria-pressed", String(dark));
      themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to night mode");
      if (icon) icon.textContent = dark ? "☀" : "☾";
      if (label) label.textContent = dark ? "Light mode" : "Night mode";
    }

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#0b1220" : "#ffffff");
  }

  if (themeButton) {
    applyTheme(root.dataset.theme || "light");
    themeButton.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  function closeMenu() {
    if (!menuButton || !nav) return;
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        nav.classList.add("is-open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation menu");
      }
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  document.querySelectorAll(".cite-button").forEach((button) => {
    button.addEventListener("click", () => {
      const publication = button.closest(".pub-content");
      const panel = publication ? publication.querySelector(".citation-panel") : null;
      if (!panel) return;
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
      button.textContent = willOpen ? "Hide citation" : "Cite";
    });
  });

  document.querySelectorAll(".copy-bibtex").forEach((button) => {
    button.addEventListener("click", async () => {
      const panel = button.closest(".citation-panel");
      const code = panel ? panel.querySelector("pre code") : null;
      if (!code) return;

      const bibtex = code.textContent.trim();

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(bibtex);
        } else {
          throw new Error("Clipboard API unavailable");
        }
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = bibtex;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      button.textContent = "Copied";
      button.classList.add("copied");
      window.setTimeout(() => {
        button.textContent = "Copy BibTeX";
        button.classList.remove("copied");
      }, 1600);
    });
  });

  const emailParts = {
    ug: ["z.vashakidze", "ug.edu.ge"],
    tsu: ["zurab.vashakidze", "tsu.ge"]
  };

  function getActualEmail(element) {
    const parts = emailParts[element?.dataset?.emailKey];
    return parts ? parts[0] + "@" + parts[1] : "";
  }

  async function copyPlainText(text) {
    if (!text) return false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      return true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    }
  }

  function showEmailCopied(element) {
    element.classList.add("is-copied");
    window.setTimeout(() => element.classList.remove("is-copied"), 1600);
  }

  document.querySelectorAll(".copy-email-address").forEach((element) => {
    const copyEmail = async () => {
      const actualEmail = getActualEmail(element);
      if (await copyPlainText(actualEmail)) showEmailCopied(element);
    };

    element.addEventListener("click", copyEmail);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        copyEmail();
      }
    });
  });

  document.addEventListener("copy", (event) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();

    document.querySelectorAll(".copy-email-address").forEach((element) => {
      if (selectedText !== element.textContent.trim()) return;

      const actualEmail = getActualEmail(element);
      if (!actualEmail || !event.clipboardData) return;

      event.preventDefault();
      event.clipboardData.setData("text/plain", actualEmail);
      showEmailCopied(element);
    });
  });

  const searchInput = document.getElementById("publication-search");
  const filterHost = document.getElementById("publication-year-filters");
  const countLabel = document.getElementById("publication-count");
  const emptyState = document.getElementById("publication-empty");
  const publications = Array.from(document.querySelectorAll(".publication"));
  let activeYear = "all";

  if (filterHost && publications.length) {
    const years = [...new Set(publications.map((publication) => {
      const yearNode = publication.querySelector(".pub-year");
      return yearNode ? yearNode.textContent.trim() : "";
    }).filter(Boolean))].sort((a, b) => Number(b) - Number(a));

    ["all", ...years].forEach((year) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "year-filter" + (year === "all" ? " is-active" : "");
      button.dataset.year = year;
      button.textContent = year === "all" ? "All years" : year;
      button.addEventListener("click", () => {
        activeYear = year;
        filterHost.querySelectorAll(".year-filter").forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });
        applyPublicationFilters();
      });
      filterHost.appendChild(button);
    });
  }

  function applyPublicationFilters() {
    if (!publications.length) return;

    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visibleCount = 0;

    publications.forEach((publication) => {
      const yearNode = publication.querySelector(".pub-year");
      const year = yearNode ? yearNode.textContent.trim() : "";
      const text = publication.textContent.toLowerCase();
      const matchesYear = activeYear === "all" || year === activeYear;
      const matchesQuery = !query || text.includes(query);
      const visible = matchesYear && matchesQuery;

      publication.classList.toggle("is-filtered-out", !visible);
      if (visible) visibleCount += 1;
    });

    if (countLabel) {
      countLabel.textContent = visibleCount + (visibleCount === 1 ? " publication" : " publications");
    }
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyPublicationFilters);
  }
  applyPublicationFilters();

  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  const sectionMap = navLinks.map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  }).filter(Boolean);

  if ("IntersectionObserver" in window && sectionMap.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) return;
      const activeId = visibleEntries[0].target.id;

      sectionMap.forEach(({ link, target }) => {
        link.classList.toggle("is-active", target.id === activeId);
      });
    }, {
      rootMargin: "-28% 0px -58% 0px",
      threshold: [0.01, 0.15, 0.3]
    });

    sectionMap.forEach(({ target }) => activeObserver.observe(target));
  }

  const revealTargets = document.querySelectorAll(
    ".section .container > *, .info-card, .course-card, .profile-link-card, .publication, .email-card"
  );

  revealTargets.forEach((element) => element.classList.add("reveal-item"));

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;

    if (progressBar) progressBar.style.width = progress + "%";
    if (backToTop) backToTop.classList.toggle("is-visible", scrollTop > 520);
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  window.addEventListener("resize", updateScrollUI);
  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
  }
})();
