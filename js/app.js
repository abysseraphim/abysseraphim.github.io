// ── ROUTER ──────────────────────────────────────────────
function getRoute() {
  return location.hash.replace('#', '') || 'home';
}

async function navigate() {
  const route = getRoute();

  // load the page html
  const res = await fetch(`pages/${route}.html`);
  if (!res.ok) return;
  document.getElementById('main').innerHTML = await res.text();

  // update active nav link
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${route}`);
  });

  // run typewriter if the page has one
  const el = document.querySelector('[data-typewriter]');
  if (el) typewriter(el, el.dataset.typewriter);
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);


// ── TYPEWRITER ──────────────────────────────────────────
function typewriter(el, text) {
  el.textContent = '';
  let i = 0;

  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, 45);
    }
  }
  tick();
}
