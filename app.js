(() => {
  'use strict';
  const data = window.CARTA;
  const byId = id => document.getElementById(id);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  byId('letter-title').textContent = data.saludo;
  data.parrafos.forEach(text => { const p = document.createElement('p'); p.textContent = text; byId('letter-body').append(p); });
  byId('signature').textContent = data.firma;
  byId('beach-text').textContent = data.playaTexto;
  function placeholder(slot, beach) {
    const box = document.createElement('div'); box.className = 'photo-placeholder';
    const icon = document.createElement('span'); icon.textContent = beach ? '☀' : '♡';
    const text = document.createElement('p'); text.textContent = 'Aquí irá nuestra foto';
    box.append(icon, text); slot.replaceChildren(box);
  }
  function gallery(items, id, beach = false) {
    items.forEach(item => {
      const figure = document.createElement('figure'); figure.className = 'polaroid reveal';
      const slot = document.createElement('div'); slot.className = 'photo-slot';
      if (item.src) {
        const img = document.createElement('img'); img.src = item.src; img.alt = item.alt; img.loading = 'lazy'; img.decoding = 'async';
        img.addEventListener('error', () => placeholder(slot, beach), { once: true }); slot.append(img);
      } else placeholder(slot, beach);
      const caption = document.createElement('figcaption'); caption.textContent = item.texto;
      const date = document.createElement('span'); date.className = 'photo-date'; date.textContent = item.fecha || '';
      caption.append(date); figure.append(slot, caption); byId(id).append(figure);
    });
  }
  gallery(data.recuerdos, 'memories-gallery'); gallery(data.playaFotos, 'beach-gallery', true);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const canvas = byId('petals'); const ctx = canvas.getContext('2d');
  let width, height, particles = [], lastTime = 0, frame = 0, opened = false;
  function resize() { width = innerWidth; height = innerHeight; const ratio = Math.min(devicePixelRatio || 1, 2); canvas.width = width * ratio; canvas.height = height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); }
  function petal(burst = false, x = 0, y = 0) {
    const angle = Math.random() * Math.PI * 2, speed = 160 + Math.random() * 430;
    return { x: burst ? x : Math.random() * width, y: burst ? y : -25, vx: burst ? Math.cos(angle) * speed : 10 + Math.random() * 16, vy: burst ? Math.sin(angle) * speed - 120 : 22 + Math.random() * 30, size: 5 + Math.random() * 8, angle, spin: Math.random() * 3 - 1.5, life: burst ? 3.8 : 22, burst, color: ['#c95880','#e78faf','#fbe0e8','#d87699'][Math.floor(Math.random()*4)] };
  }
  function tick(time) {
    frame = 0;
    if (motion.matches || document.hidden) return;
    const dt = Math.min((time - lastTime) / 1000 || 0.016, 0.035); lastTime = time;
    ctx.clearRect(0, 0, width, height);
    if (!opened && particles.filter(p => !p.burst).length < 24 && Math.random() < .12) particles.push(petal());
    particles = particles.filter(p => p.life > 0 && p.y < height + 40);
    particles.forEach(p => {
      p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.angle += p.spin * dt;
      if (p.burst) { p.vy += 165 * dt; p.vx *= Math.pow(.65, dt); }
      ctx.save(); ctx.translate(p.x + Math.sin(p.life * 2) * 8, p.y); ctx.rotate(p.angle); ctx.globalAlpha = Math.min(1, p.life); ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * .46, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    if (!opened || particles.length) frame = requestAnimationFrame(tick);
  }
  function start() { if (!frame && !motion.matches && !document.hidden) { lastTime = performance.now(); frame = requestAnimationFrame(tick); } }
  resize(); start(); window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', start);
  motion.addEventListener('change', () => { if (motion.matches) { particles = []; ctx.clearRect(0,0,width,height); } else start(); });
  byId('open-letter').addEventListener('click', () => {
    if (opened) return; opened = true;
    const button = byId('open-letter'); button.classList.add('open'); button.setAttribute('aria-expanded', 'true');
    const rect = button.getBoundingClientRect();
    setTimeout(() => { if (!motion.matches) { for (let i = 0; i < 115; i++) particles.push(petal(true, rect.left + rect.width / 2, rect.top + rect.height / 2)); start(); } }, motion.matches ? 0 : 380);
    setTimeout(() => byId('welcome').classList.add('departing'), motion.matches ? 0 : 1350);
    setTimeout(() => {
      byId('welcome').hidden = true; byId('story').hidden = false;
      window.scrollTo({ top: 0, behavior: 'instant' }); byId('letter-title').focus({ preventScroll: true });
    }, motion.matches ? 0 : 1950);
  });
  byId('replay').addEventListener('click', () => {
    byId('story').hidden = true; byId('welcome').hidden = false; byId('welcome').classList.remove('departing');
    const button = byId('open-letter'); button.classList.remove('open'); button.setAttribute('aria-expanded', 'false');
    opened = false; particles = []; window.scrollTo({ top: 0, behavior: 'instant' }); button.focus({ preventScroll: true }); start();
  });
})();
