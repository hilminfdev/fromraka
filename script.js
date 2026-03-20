// ── STARS ──
const starsEl = document.getElementById("stars");
for (let i = 0; i < 80; i++) {
  const s = document.createElement("div");
  s.className = "star";
  s.style.cssText = `
          left:${Math.random() * 100}%;
          top:${Math.random() * 100}%;
          --t:${2 + Math.random() * 4}s;
          --d:${Math.random() * 4}s;
          opacity:${Math.random() * 0.5};
        `;
  starsEl.appendChild(s);
}

// ── CANVAS GRADIENT BG ──
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let t = 0;
function drawBg() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#0b0f2e";
  ctx.fillRect(0, 0, W, H);

  // animated subtle gradient orbs on canvas
  const grd1 = ctx.createRadialGradient(
    W * 0.2 + Math.sin(t * 0.4) * 30,
    H * 0.3 + Math.cos(t * 0.3) * 20,
    0,
    W * 0.2,
    H * 0.3,
    W * 0.55,
  );
  grd1.addColorStop(0, "rgba(139,0,0,0.25)");
  grd1.addColorStop(1, "transparent");
  ctx.fillStyle = grd1;
  ctx.fillRect(0, 0, W, H);

  const grd2 = ctx.createRadialGradient(
    W * 0.8 + Math.cos(t * 0.2) * 40,
    H * 0.6 + Math.sin(t * 0.35) * 30,
    0,
    W * 0.8,
    H * 0.6,
    W * 0.5,
  );
  grd2.addColorStop(0, "rgba(192,57,90,0.18)");
  grd2.addColorStop(1, "transparent");
  ctx.fillStyle = grd2;
  ctx.fillRect(0, 0, W, H);

  t += 0.008;
  requestAnimationFrame(drawBg);
}
drawBg();

// ── PARALLAX ORBS ──
const orbs = document.querySelectorAll(".orb");
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    orbs.forEach((orb) => {
      const speed = parseFloat(orb.dataset.speed);
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  },
  { passive: true },
);

// ── INTERSECTION OBSERVER ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.25 },
);

document
  .querySelectorAll(".card, .gallery-title, .gallery, .ending-card")
  .forEach((el) => {
    observer.observe(el);
  });

// Auto-show hero card
setTimeout(() => {
  document.querySelector(".hero-section .card")?.classList.add("show");
}, 200);

// ── BUTTON EFFECT ──
const btn = document.getElementById("loveBtn");
const petals = ["🌸", "🌺", "🌹", "💮", "🪷", "❤️", "🌷", "✨"];

btn.addEventListener("click", (e) => {
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Ripple from button
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.cssText = `
          width: 60px; height: 60px;
          left: ${cx - 30}px; top: ${cy - 30}px;
        `;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 900);

  // Heart burst from button center
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("div");
    h.className = "heart-burst";
    const angle = (i / 12) * Math.PI * 2;
    const dist = 80 + Math.random() * 60;
    h.style.cssText = `
            left: ${cx}px; top: ${cy}px;
            --tx: ${Math.cos(angle) * dist}px;
            --ty: ${Math.sin(angle) * dist}px;
            --d: ${0.6 + Math.random() * 0.4}s;
          `;
    h.textContent = Math.random() > 0.5 ? "❤️" : "✨";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1100);
  }

  // Petals falling from top
  for (let i = 0; i < 28; i++) {
    setTimeout(() => {
      const petal = document.createElement("div");
      petal.className = "petal";
      const spin = (Math.random() - 0.5) * 720;
      petal.style.cssText = `
              left: ${Math.random() * 100}vw;
              font-size: ${14 + Math.random() * 16}px;
              --dur: ${2.5 + Math.random() * 2}s;
              --spin: ${spin}deg;
              animation-delay: ${Math.random() * 0.5}s;
            `;
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 5000);
    }, i * 60);
  }
});
