let animationId = null;
let particles = [];
let canvas = null;
let ctx = null;

const COLORS = ['#ffd700', '#00d4ff', '#e63946', '#ffffff', '#7b2ff7'];

function resize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: 6 + Math.random() * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speedY: 2 + Math.random() * 4,
    speedX: -2 + Math.random() * 4,
    rotation: Math.random() * 360,
    spin: -4 + Math.random() * 8,
  };
}

function draw() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });

  particles = particles.filter((p) => p.y < canvas.height + 30);

  while (particles.length < 120) {
    particles.push(createParticle());
  }

  animationId = requestAnimationFrame(draw);
}

export function startConfetti() {
  canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
  particles = Array.from({ length: 80 }, createParticle);
  if (animationId) cancelAnimationFrame(animationId);
  draw();
}

export function stopConfetti() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  window.removeEventListener('resize', resize);
  particles = [];
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
