// Links de WhatsApp
document.querySelectorAll('.js-wa').forEach(a => {
  const msg = a.dataset.msg || 'Hola Olympus!';
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
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
      <ul>${clases.map(([h, act]) => `<li><time>${h} hs</time><span>${act}</span></li>`).join('')}</ul>
    </div>`).join('');
});

// Precios
const prices = document.getElementById('prices');
tabs(document.getElementById('price-tabs'), PRECIOS.categorias.map(c => c.tab), i => {
  prices.innerHTML = PRECIOS.categorias[i].grupos.map(g => `
    <div class="price-card">
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

document.getElementById('y').textContent = new Date().getFullYear();

// Aparición suave al hacer scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .12 });
document.querySelectorAll('.section .wrap > *, .cta .wrap > *').forEach(el => { el.classList.add('reveal'); io.observe(el); });
