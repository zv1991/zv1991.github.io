(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");

  if (themeButton) {
    const icon = themeButton.querySelector(".theme-toggle-icon");
    const label = themeButton.querySelector(".theme-toggle-label");

    function applyTheme(theme) {
      const dark = theme === "dark";
      root.dataset.theme = dark ? "dark" : "light";
      themeButton.setAttribute("aria-pressed", String(dark));
      themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to night mode");
      if (icon) icon.textContent = dark ? "☀" : "☾";
      if (label) label.textContent = dark ? "Light mode" : "Night mode";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0b1220" : "#ffffff");
    }

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
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      if (open) {
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
      if (event.key === "Escape") {
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
      const panel = publication?.querySelector(".citation-panel");
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
      const code = panel?.querySelector("pre code");
      if (!code) return;

      const bibtex = code.textContent.trim();
      const original = "Copy BibTeX";

      try {
        await navigator.clipboard.writeText(bibtex);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = bibtex;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      button.textContent = "Copied";
      button.classList.add("copied");
      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("copied");
      }, 1600);
    });
  });
})();
