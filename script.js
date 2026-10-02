(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");

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
