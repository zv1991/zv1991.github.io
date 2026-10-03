(() => {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function createMesh(canvas, options) {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let visible = true;

    const cols = options.cols;
    const rows = options.rows;
    const points = [];

    function resetPoints() {
      points.length = 0;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          points.push({
            phase: Math.random() * Math.PI * 2,
            weight: 0.65 + Math.random() * 0.7
          });
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pointAt(c, r, now) {
      const i = r * cols + c;
      const point = points[i];
      const nx = c / (cols - 1);
      const ny = r / (rows - 1);

      const baseX = nx * width;
      const perspective = options.perspective ? (0.68 + ny * 0.52) : 1;
      const x = (baseX - width * 0.5) * perspective + width * 0.5;

      const wave =
        Math.sin(nx * Math.PI * 3.1 + now * options.speed + point.phase) * options.amp * point.weight +
        Math.cos((nx + ny) * Math.PI * 2.1 - now * options.speed * 0.68) * options.amp * 0.46;

      const pointerInfluence =
        Math.exp(
          -(
            Math.pow(nx - pointerX, 2) / 0.055 +
            Math.pow(ny - pointerY, 2) / 0.095
          )
        ) * options.pointerAmp;

      return { x, y: ny * height + wave - pointerInfluence };
    }

    function strokeForRow(r) {
      const depth = r / Math.max(1, rows - 1);
      const alpha = options.header
        ? 0.035 + (1 - depth) * 0.085
        : 0.055 + (1 - depth) * 0.22;

      if (options.header) {
        return "rgba(136,174,255," + alpha.toFixed(3) + ")";
      }

      const red = Math.round(82 + depth * 34);
      const green = Math.round(145 + depth * 35);
      const blue = Math.round(245 - depth * 16);
      return "rgba(" + red + "," + green + "," + blue + "," + alpha.toFixed(3) + ")";
    }

    function draw(nowMs) {
      if (!visible) {
        raf = 0;
        return;
      }

      const now = nowMs * 0.001;

      pointerX += (targetX - pointerX) * 0.055;
      pointerY += (targetY - pointerY) * 0.055;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = options.header ? 0.72 : 0.9;

      for (let r = 0; r < rows; r += 1) {
        ctx.strokeStyle = strokeForRow(r);
        ctx.beginPath();
        for (let c = 0; c < cols; c += 1) {
          const p = pointAt(c, r, now);
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c += 1) {
        ctx.strokeStyle = options.header
          ? "rgba(130,160,220,.045)"
          : "rgba(148,168,220,.065)";
        ctx.beginPath();
        for (let r = 0; r < rows; r += 1) {
          const p = pointAt(c, r, now);
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      if (!options.header) {
        ctx.strokeStyle = "rgba(121,166,255,.075)";
        ctx.lineWidth = 0.7;

        for (let r = 0; r < rows - 1; r += 1) {
          for (let c = 0; c < cols - 1; c += 1) {
            const a = pointAt(c, r, now);
            const b = pointAt(c + 1, r, now);
            const d = pointAt(c, r + 1, now);
            const e = pointAt(c + 1, r + 1, now);

            ctx.beginPath();
            if ((r + c) % 2 === 0) {
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(e.x, e.y);
            } else {
              ctx.moveTo(b.x, b.y);
              ctx.lineTo(d.x, d.y);
            }
            ctx.stroke();
          }
        }
      }

      if (!reduced.matches) {
        raf = window.requestAnimationFrame(draw);
      } else {
        raf = 0;
      }
    }

    function onPointer(event) {
      if (!finePointer.matches || reduced.matches) return;
      const rect = canvas.getBoundingClientRect();
      targetX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      targetY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    }

    function onLeave() {
      targetX = 0.5;
      targetY = 0.5;
    }

    resetPoints();
    resize();

    canvas.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });

    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(raf);
      resize();
      raf = reduced.matches ? 0 : window.requestAnimationFrame(draw);
      if (reduced.matches) draw(1);
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !reduced.matches && !raf) {
          raf = window.requestAnimationFrame(draw);
        }
      }, { threshold: 0 }).observe(canvas);
    }

    document.addEventListener("visibilitychange", () => {
      visible = !document.hidden;
      if (visible && !reduced.matches && !raf) {
        raf = window.requestAnimationFrame(draw);
      }
    });

    if (reduced.matches) draw(1);
    else raf = window.requestAnimationFrame(draw);
  }

  createMesh(document.getElementById("toolbar-mesh"), {
    cols: 28,
    rows: 5,
    amp: 2.1,
    pointerAmp: 4.5,
    speed: 0.48,
    perspective: false,
    header: true
  });

  createMesh(document.getElementById("hero-mesh"), {
    cols: 25,
    rows: 17,
    amp: 13,
    pointerAmp: 34,
    speed: 0.62,
    perspective: true,
    header: false
  });
})();