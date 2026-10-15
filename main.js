const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Links de WhatsApp
document.querySelectorAll('.js-wa').forEach(a => {
  const msg = a.dataset.msg || 'Hola Olympus!';
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
});

// Loader → arranca la animación del hero
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('ready'), 350);
  }, reduceMotion ? 0 : 1300);
});

// Hero: fotos que van rotando
const slidesEl = document.getElementById('slides');
const dotsEl = document.getElementById('slide-dots');
slidesEl.innerHTML = FOTOS.hero.map(src => `<div class="slide" style="--img:url('${src}')"></div>`).join('');
dotsEl.innerHTML = FOTOS.hero.map((_, i) => `<button aria-label="Foto ${i + 1}"></button>`).join('');
const slides = [...slidesEl.children], dots = [...dotsEl.children];
let current = -1, timer;
function showSlide(i) {
  current = i % slides.length;
  slides.forEach((s, j) => s.classList.toggle('active', j === current));
  dots.forEach((d, j) => d.classList.toggle('active', j === current));
  clearTimeout(timer);
  timer = setTimeout(() => showSlide(current + 1), 5500);
}
dots.forEach((d, i) => d.addEventListener('click', () => showSlide(i)));
showSlide(0);

// Galería horizontal
const track = document.getElementById('gallery');
track.innerHTML = FOTOS.galeria.map(src => `<figure class="shot" style="--img:url('${src}')"></figure>`).join('');
const hsec = document.querySelector('.hscroll');
function sizeGallery() {
  hsec.style.height = `${track.scrollWidth - innerWidth + innerHeight}px`;
}

// Nav, barra de progreso, galería y parallax en un solo loop de scroll
const nav = document.querySelector('.nav');
const progress = document.querySelector('.progress');
const parallax = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;
function onScroll() {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 40);
  progress.style.setProperty('--p', y / (document.documentElement.scrollHeight - innerHeight));

  const r = hsec.getBoundingClientRect();
  const total = hsec.offsetHeight - innerHeight;
  const p = Math.min(Math.max(-r.top / total, 0), 1);
  track.style.transform = `translate3d(${-(track.scrollWidth - innerWidth) * p}px,0,0)`;

  parallax.forEach(el => {
    const b = el.parentElement.getBoundingClientRect();
    el.style.transform = `translate3d(0,${(b.top + b.height / 2 - innerHeight / 2) * -el.dataset.parallax}px,0)`;
  });
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
addEventListener('resize', () => { sizeGallery(); onScroll(); });
sizeGallery(); onScroll();

// Menú móvil
document.querySelector('.burger').addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
  document.body.classList.toggle('lock');
});
document.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open', 'lock')));

// Títulos que entran palabra por palabra
document.querySelectorAll('[data-split]').forEach(el => {
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map((w, i) => `<span class="w"><span style="--wd:${i * 0.08}s">${w}</span></span>`).join(' ');
});

// Pestañas genéricas
function tabs(container, labels, onSelect) {
  container.innerHTML = labels.map((l, i) => `<button role="tab" class="tab${i ? '' : ' active'}">${l}</button>`).join('');
  [...container.children].forEach((b, i) => b.addEventListener('click', () => {
    [...container.children].forEach(x => x.classList.toggle('active', x === b));
    onSelect(i);
  }));
  onSelect(0);
}

// Cronograma
const schedule = document.getElementById('schedule');
const tiposCrono = ['clases', 'crossfit'];
tabs(document.getElementById('schedule-tabs'), ['Clases', 'CrossFit'], i => {
  schedule.innerHTML = Object.entries(CRONOGRAMA[tiposCrono[i]]).map(([dia, clases]) => `
    <div class="day">
      <h4>${dia}</h4>
      <ul>${clases.map(([h, act]) => `<li><time>${h} HS</time><span>${act}</span></li>`).join('')}</ul>
    </div>`).join('');
});

// Precios
const prices = document.getElementById('prices');
tabs(document.getElementById('price-tabs'), PRECIOS.categorias.map(c => c.tab), i => {
  prices.innerHTML = PRECIOS.categorias[i].grupos.map(g => `
    <div class="price-card glow">
      <h3>${g.titulo}</h3>
      <ul>${g.items.map(it => `
        <li>
          <div class="plan"><strong>${it.plan}</strong>${it.nota ? `<small>${it.nota}</small>` : ''}</div>
          <div class="amount">${it.efectivo}${it.otro ? `<small>efectivo · ${it.otro} otros medios</small>` : ''}</div>
        </li>`).join('')}
      </ul>
    </div>`).join('');
});
document.getElementById('prices-note').textContent = PRECIOS.aclaracion + ' Pagás en el local o lo coordinamos por WhatsApp.';

// Opiniones: se duplican para que el carrusel sea infinito
const reviews = document.getElementById('reviews');
reviews.innerHTML += reviews.innerHTML;

// Brillo que sigue al mouse
document.addEventListener('pointermove', e => {
  const el = e.target.closest('.glow');
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--x', `${e.clientX - r.left}px`);
  el.style.setProperty('--y', `${e.clientY - r.top}px`);
});

// Fotos de Nico & Steffy: se inclinan siguiendo el mouse
if (matchMedia('(hover: hover)').matches && !reduceMotion) {
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)${el.classList.contains('tp-back') ? ' rotate(4deg)' : ''}`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// Contadores
function count(el) {
  const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '';
  const t0 = performance.now(), dur = 1800;
  (function step(t) {
    const k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 4);
    el.textContent = pre + (end * e).toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}

// Apariciones al hacer scroll
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(count);
  io.unobserve(e.target);
}), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, [data-split]').forEach(el => io.observe(el));

document.getElementById('y').textContent = new Date().getFullYear();
