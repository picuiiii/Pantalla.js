const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Función para redimensionar el canvas
function ajustarCanvas(canvas) {
  const ratio = 16 / 9;
  let w = window.innerWidth;
  let h = window.innerHeight;
  if (w / h > ratio) {
    w = h * ratio;
  } else {
    h = w / ratio;
  }
  canvas.width = w;
  canvas.height = h;
}

// Función para dibujar el fondo
function dibujarFondo(ctx, fondo) {
  ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
}

// >>> AQUÍ PEGAS ESTO <<<
const imagenFondo = new Image();
imagenFondo.src = 'fondo.jpg'; // Cambia por tu imagen real
imagenFondo.onload = () => {
  ajustarCanvas(canvas); // Asegúrate que el canvas esté bien
  dibujarFondo(ctx, imagenFondo); // Dibuja fondo al cargar
};

// Evento para redibujar al rotar/redimensionar
window.addEventListener('resize', () => {
  ajustarCanvas(canvas);
  dibujarFondo(ctx, imagenFondo);
});

export async function iniciarPantallaCompleta(canvas, overlayId = 'pantallaInicio') {
  const elem = document.documentElement;

  if (elem.requestFullscreen) await elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();

  if (screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock("landscape");
    } catch (e) {
      console.warn("No se pudo bloquear la orientación:", e);
    }
  }

  document.getElementById(overlayId).style.display = 'none';
  ajustarCanvas(canvas);
}

export function configurarPantalla(canvas, overlayId = 'pantallaInicio') {
  const overlay = document.getElementById(overlayId);

  function mostrarOverlay() {
    overlay.style.display = 'flex';
  }

  overlay.addEventListener('click', () => iniciarPantallaCompleta(canvas, overlayId));
  window.addEventListener('resize', () => ajustarCanvas(canvas));
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      ajustarCanvas(canvas);
      if (!document.fullscreenElement) {
        mostrarOverlay();
      }
    }, 300);
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      mostrarOverlay();
    }
  });

  ajustarCanvas(canvas);
}

export function mostrarDebug() {
  const logDiv = document.getElementById("debugConsole");
  if (!logDiv) return;

  const log = console.log;
  console.log = function (...args) {
    logDiv.innerHTML += args.join(' ') + "<br>";
    log.apply(console, args);
  };
}
window.addEventListener('resize', () => {
  ajustarCanvas(canvas);
  dibujarFondo(ctx, imagenFondo);
});