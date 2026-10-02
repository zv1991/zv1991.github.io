(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  const progressBar = document.getElementById("scroll-progress-bar");
  const backToTop = document.getElementById("back-to-top");
  const commandButton = document.getElementById("command-button");
  const commandPalette = document.getElementById("command-palette");
  const commandClose = document.getElementById("command-close");
  const commandInput = document.getElementById("command-search-input");
  const commandResults = document.getElementById("command-results");

  const commandShortcut = commandButton?.querySelector(".command-shortcut");
  if (commandShortcut && /Mac|iPhone|iPad/.test(navigator.platform)) {
    commandShortcut.textContent = "⌘ K";
  }

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

  const toast = document.getElementById("site-toast");
  let toastTimer = null;

  function showToast(message, isError = false) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle("is-error", isError);
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible", "is-error");
    }, 2200);
  }

  const emailParts = {
    ug: ["z.vashakidze", "ug.edu.ge"],
    tsu: ["zurab.vashakidze", "tsu.ge"]
  };

  function getActualEmailFromKey(key) {
    const parts = emailParts[key];
    return parts ? parts[0] + "@" + parts[1] : "";
  }

  async function copyPlainText(text) {
    if (!text) return false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {}
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.setAttribute("aria-hidden", "true");
    Object.assign(textarea.style, {
      position: "fixed",
      top: "8px",
      left: "8px",
      width: "2px",
      height: "2px",
      padding: "0",
      border: "0",
      opacity: "0.01",
      pointerEvents: "none"
    });
    document.body.appendChild(textarea);

    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {}

    textarea.remove();

    if (copied) return true;

    const fallback = document.createElement("span");
    fallback.textContent = text;
    fallback.contentEditable = "true";
    fallback.setAttribute("aria-hidden", "true");
    Object.assign(fallback.style, {
      position: "fixed",
      left: "-10000px",
      top: "0"
    });
    document.body.appendChild(fallback);

    const range = document.createRange();
    range.selectNodeContents(fallback);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      copied = document.execCommand("copy");
    } catch {}

    selection.removeAllRanges();
    fallback.remove();
    return copied;
  }

  document.querySelectorAll(".email-copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const actualEmail = getActualEmailFromKey(button.dataset.emailKey);
      const copied = await copyPlainText(actualEmail);

      if (copied) {
        const original = button.textContent;
        button.textContent = "Copied";
        button.classList.add("is-copied");
        showToast("Email address copied to clipboard");
        window.setTimeout(() => {
          button.textContent = original;
          button.classList.remove("is-copied");
        }, 1600);
      } else {
        showToast("Copy failed. Please copy the address manually.", true);
      }
    });
  });

  const shareButton = document.getElementById("share-profile");
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      const shareData = {
        title: document.title,
        text: "Zurab Vashakidze — academic profile",
        url: window.location.href.split("#")[0]
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error && error.name === "AbortError") return;
        }
      }

      const copied = await copyPlainText(shareData.url);
      showToast(
        copied ? "Profile link copied to clipboard" : "Could not copy the profile link",
        !copied
      );
    });
  }

  const commandItems = [
    { type: "Section", title: "About", meta: "Biography and focus", target: "#about", search: "about biography numerical analysis" },
    { type: "Section", title: "Research", meta: "Research themes", target: "#research", search: "research pde spectral hyperbolic wave" },
    { type: "Section", title: "Publications", meta: "Recent work and BibTeX", target: "#publications", search: "publications papers bibtex cite" },
    { type: "Section", title: "Teaching", meta: "Courses", target: "#teaching", search: "teaching courses calculus numerical methods" },
    { type: "Section", title: "Profiles", meta: "Scholar · ORCID · Scopus", target: "#profiles", search: "profiles scholar orcid scopus researchgate arxiv" },
    { type: "Section", title: "Contact", meta: "Institutional email", target: "#contact", search: "contact email ug tsu" }
  ];

  document.querySelectorAll(".publication").forEach((publication) => {
    const title = publication.querySelector("h3")?.textContent.trim();
    const year = publication.querySelector(".pub-year")?.textContent.trim() || "";
    const authors = publication.querySelector(".pub-content > p")?.textContent.trim() || "";
    if (!title) return;

    commandItems.push({
      type: "Paper",
      title,
      meta: year,
      target: "#publications",
      search: (title + " " + authors + " " + year).toLowerCase(),
      publication
    });
  });

  let activeCommandIndex = 0;
  let filteredCommandItems = commandItems.slice();

  function closeCommandPalette() {
    if (!commandPalette?.open) return;
    commandPalette.close();
    commandButton?.focus();
  }

  function runCommandItem(item) {
    if (!item) return;
    closeCommandPalette();

    if (item.publication) {
      item.publication.scrollIntoView({ behavior: "smooth", block: "center" });
      item.publication.classList.add("command-highlight");
      window.setTimeout(() => item.publication.classList.remove("command-highlight"), 1800);
      return;
    }

    document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderCommandResults(query = "") {
    if (!commandResults) return;

    const normalized = query.trim().toLowerCase();
    filteredCommandItems = commandItems.filter((item) =>
      !normalized || (item.title + " " + item.meta + " " + item.search).toLowerCase().includes(normalized)
    ).slice(0, 12);

    activeCommandIndex = Math.min(activeCommandIndex, Math.max(0, filteredCommandItems.length - 1));
    commandResults.innerHTML = "";

    if (!filteredCommandItems.length) {
      const empty = document.createElement("p");
      empty.className = "command-empty";
      empty.textContent = "No matching sections or publications.";
      commandResults.appendChild(empty);
      return;
    }

    filteredCommandItems.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "command-result" + (index === activeCommandIndex ? " is-active" : "");
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", String(index === activeCommandIndex));
      button.innerHTML =
        '<span class="command-result-type"></span>' +
        '<span class="command-result-title"></span>' +
        '<span class="command-result-meta"></span>';

      button.querySelector(".command-result-type").textContent = item.type;
      button.querySelector(".command-result-title").textContent = item.title;
      button.querySelector(".command-result-meta").textContent = item.meta;
      button.addEventListener("mouseenter", () => {
        activeCommandIndex = index;
        renderCommandResults(commandInput?.value || "");
      });
      button.addEventListener("click", () => runCommandItem(item));
      commandResults.appendChild(button);
    });
  }

  function openCommandPalette() {
    if (!commandPalette) return;
    renderCommandResults("");
    if (commandInput) commandInput.value = "";
    commandPalette.showModal();
    window.setTimeout(() => commandInput?.focus(), 0);
  }

  commandButton?.addEventListener("click", openCommandPalette);
  commandClose?.addEventListener("click", closeCommandPalette);

  commandPalette?.addEventListener("click", (event) => {
    if (event.target === commandPalette) closeCommandPalette();
  });

  commandInput?.addEventListener("input", () => {
    activeCommandIndex = 0;
    renderCommandResults(commandInput.value);
  });

  commandInput?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeCommandIndex = Math.min(filteredCommandItems.length - 1, activeCommandIndex + 1);
      renderCommandResults(commandInput.value);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeCommandIndex = Math.max(0, activeCommandIndex - 1);
      renderCommandResults(commandInput.value);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommandItem(filteredCommandItems[activeCommandIndex]);
    }
  });

  const searchInput = document.getElementById("publication-search");
  const filterHost = document.getElementById("publication-year-filters");
  const countLabel = document.getElementById("publication-count");
  const clearFiltersButton = document.getElementById("clear-publication-filters");
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
    if (clearFiltersButton) {
      clearFiltersButton.hidden = activeYear === "all" && !query;
    }
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyPublicationFilters);
  }

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", () => {
      activeYear = "all";
      if (searchInput) searchInput.value = "";
      filterHost?.querySelectorAll(".year-filter").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.year === "all");
      });
      applyPublicationFilters();
      searchInput?.focus();
    });
  }

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (commandPalette?.open) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
      return;
    }

    if (event.key === "Escape" && commandPalette?.open) {
      event.preventDefault();
      closeCommandPalette();
      return;
    }

    if (event.key === "/" && !typing && searchInput) {
      event.preventDefault();
      searchInput.focus();
    }

    if (event.key === "Escape" && document.activeElement === searchInput && searchInput?.value) {
      searchInput.value = "";
      applyPublicationFilters();
    }
  });

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
