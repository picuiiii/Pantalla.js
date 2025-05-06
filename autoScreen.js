export function ajustarCanvas(canvas) {
  const ratio = 16 / 9;
  let ancho = window.innerWidth;
  let alto = window.innerHeight;

  if (ancho / alto > ratio) {
    ancho = alto * ratio;
  } else {
    alto = ancho / ratio;
  }

  canvas.width = ancho;
  canvas.height = alto;
  canvas.style.width = ancho + "px";
  canvas.style.height = alto + "px";
}

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

export function configurarPantalla(canvas, dibujarFondo = null, overlayId = 'pantallaInicio') {
  const overlay = document.getElementById(overlayId);

  function mostrarOverlay() {
    overlay.style.display = 'flex';
  }

  overlay.addEventListener('click', () => iniciarPantallaCompleta(canvas, overlayId));

  window.addEventListener('resize', () => {
    ajustarCanvas(canvas);
    if (dibujarFondo) dibujarFondo();
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      ajustarCanvas(canvas);
      if (!document.fullscreenElement) mostrarOverlay();
      if (dibujarFondo) dibujarFondo();
    }, 300);
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) mostrarOverlay();
  });

  ajustarCanvas(canvas);
  if (dibujarFondo) dibujarFondo();
}