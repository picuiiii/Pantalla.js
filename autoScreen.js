// autoScreen.js

function crearElemento(tipo, id, estiloExtra = {}) {
  const el = document.createElement(tipo);
  el.id = id;
  Object.assign(el.style, {
    position: 'absolute',
    zIndex: 10,
    ...estiloExtra
  });
  document.body.appendChild(el);
  return el;
}

function ajustarCanvas(canvas) {
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    posicionarElementos();
  }
  window.addEventListener('resize', resize);
  resize();
}

let joystick, botonSalto, botonAccion;

function posicionarElementos() {
  joystick.style.left = '60px';
  joystick.style.top = `${window.innerHeight - 160}px`;

  botonSalto.style.left = `${window.innerWidth - 140}px`;
  botonSalto.style.top = `${window.innerHeight - 140}px`;

  botonAccion.style.left = `${window.innerWidth - 260}px`;
  botonAccion.style.top = `${window.innerHeight - 160}px`;
}

// Inicialización automática
window.addEventListener('load', () => {
  // Fondo de la página
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
  document.body.style.backgroundColor = '#A0E7E5'; // Turquesa pastel

  // Canvas
  const canvas = crearElemento('canvas', 'canvas', { background: 'transparent' });
  ajustarCanvas(canvas);

  // Joystick
  joystick = crearElemento('div', 'joystick', {
    width: '100px',
    height: '100px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%'
  });

  // Botón de salto
  botonSalto = crearElemento('div', 'botonSalto', {
    width: '80px',
    height: '80px',
    background: 'rgba(0,255,0,0.5)',
    borderRadius: '50%'
  });

  // Botón de acción
  botonAccion = crearElemento('div', 'botonAccion', {
    width: '80px',
    height: '80px',
    background: 'rgba(255,0,0,0.5)',
    borderRadius: '50%'
  });
});