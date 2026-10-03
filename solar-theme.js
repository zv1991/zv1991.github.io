(() => {
  "use strict";

  const root = document.documentElement;
  const OVERRIDE_KEY = "themeOverride";
  const HORIZON = -0.833;

  try { localStorage.removeItem("theme"); } catch {}

  const norm = x => ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;

  function sunAltitude(date, latDeg, lonDeg) {
    const r = Math.PI / 180;
    const jd = date.getTime() / 86400000 + 2440587.5;
    const n = jd - 2451545;
    const L = (280.46 + 0.9856474 * n) % 360;
    const g = (357.528 + 0.9856003 * n) * r;
    const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * r;
    const eps = (23.439 - 0.0000004 * n) * r;
    const ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
    const dec = Math.asin(Math.sin(eps) * Math.sin(lambda));
    const gmst = (280.46061837 + 360.98564736629 * (jd - 2451545)) % 360;
    const ha = norm((gmst + lonDeg) * r - ra);
    const lat = latDeg * r;
    return Math.asin(
      Math.sin(lat) * Math.sin(dec) +
      Math.cos(lat) * Math.cos(dec) * Math.cos(ha)
    ) / r;
  }

  function autoState(date = new Date()) {
    let zone = "";
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch {}
    const coords = window.SOLAR_TZ_COORDS?.[zone];

    if (coords) {
      const altitude = sunAltitude(date, coords[0], coords[1]);
      return {theme: altitude > HORIZON ? "light" : "dark", zone, source: "solar"};
    }

    const h = date.getHours() + date.getMinutes() / 60;
    return {theme: h >= 6.5 && h < 18.5 ? "light" : "dark", zone, source: "local-time"};
  }

  function setMeta(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b1220" : "#ffffff");
  }

  function syncButton(state) {
    const b = document.getElementById("theme-toggle");
    if (!b) return;
    const icon = b.querySelector(".theme-toggle-icon");
    const label = b.querySelector(".theme-toggle-label");
    const manual = sessionStorage.getItem(OVERRIDE_KEY);
    const dark = root.dataset.theme === "dark";

    if (manual) {
      b.setAttribute("aria-pressed", "true");
      b.setAttribute("aria-label", "Return to automatic sunrise and sunset theme");
      b.title = "Manual override for this tab. Click to return to automatic sunrise/sunset mode.";
      if (icon) icon.textContent = "◐";
      if (label) label.textContent = "Auto mode";
      return;
    }

    b.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-label", dark ? "Automatic night mode. Switch temporarily to light mode" : "Automatic day mode. Switch temporarily to night mode");
    b.title = "Automatic theme based on approximate sunrise and sunset" + (state.zone ? " for " + state.zone.replaceAll("_", " ") : "") + ". Click to temporarily override.";
    if (icon) icon.textContent = dark ? "☾" : "☀";
    if (label) label.textContent = dark ? "Auto · Night" : "Auto · Day";
  }

  function applyAuto() {
    const state = autoState();
    const override = sessionStorage.getItem(OVERRIDE_KEY);
    const theme = override === "light" || override === "dark" ? override : state.theme;
    root.dataset.theme = theme;
    root.dataset.themeMode = override ? "manual" : "auto";
    root.dataset.themeSource = override ? "session-override" : state.source;
    setMeta(theme);
    syncButton(state);
    return state;
  }

  window.SolarTheme = {
    apply: applyAuto,
    clearOverride() {
      sessionStorage.removeItem(OVERRIDE_KEY);
      return applyAuto();
    },
    setOverride(theme) {
      if (theme !== "light" && theme !== "dark") return applyAuto();
      sessionStorage.setItem(OVERRIDE_KEY, theme);
      return applyAuto();
    }
  };

  document.addEventListener("click", event => {
    const target = event.target;
    const button = target instanceof Element ? target.closest("#theme-toggle") : null;
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    if (sessionStorage.getItem(OVERRIDE_KEY)) {
      window.SolarTheme.clearOverride();
    } else {
      window.SolarTheme.setOverride(root.dataset.theme === "dark" ? "light" : "dark");
    }
  }, true);

  document.addEventListener("DOMContentLoaded", applyAuto);
  window.addEventListener("pageshow", applyAuto);
  applyAuto();
  window.setInterval(applyAuto, 60000);
})();