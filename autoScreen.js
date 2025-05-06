function crearConsolaEnPantalla() {
  const consola = document.createElement("div");
  consola.id = "consolaPantalla";
  consola.style.position = "fixed";
  consola.style.bottom = "0";
  consola.style.left = "0";
  consola.style.width = "100%";
  consola.style.maxHeight = "30%";
  consola.style.overflowY = "auto";
  consola.style.background = "rgba(0, 0, 0, 0.7)";
  consola.style.color = "lime";
  consola.style.fontSize = "12px";
  consola.style.fontFamily = "monospace";
  consola.style.zIndex = "9999";
  consola.style.padding = "4px";
  document.body.appendChild(consola);
}

function logPantalla(mensaje) {
  const consola = document.getElementById("consolaPantalla");
  if (consola) {
    const linea = document.createElement("div");
    linea.textContent = mensaje;
    consola.appendChild(linea);
    consola.scrollTop = consola.scrollHeight;
  }
  console.log(mensaje); // También lo imprime en consola tradicional
}

export function ajustarCanvas(canvas) {
  const relacion = 16 / 9;
  let ancho = window.innerWidth;
  let alto = window.innerHeight;

  if (ancho / alto > relacion) {
    ancho = alto * relacion;
  } else {
    alto = ancho / relacion;
  }

  canvas.width = ancho;
  canvas.height = alto;
  canvas.style.width = ancho + "px";
  canvas.style.height = alto + "px";

  logPantalla(`Canvas ajustado: ${ancho}x${alto}`);
}

export async function iniciarPantallaCompleta(canvas, overlayId = 'pantallaInicio') {
  const elem = document.documentElement;
  logPantalla("Intentando pantalla completa...");

  try {
    if (elem.requestFullscreen) await elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();
    logPantalla("Pantalla completa activada.");
  } catch (e) {
    logPantalla("Error al activar pantalla completa: " + e);
  }

  if (screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock("landscape");
      logPantalla("Orientación bloqueada a paisaje.");
    } catch (e) {
      logPantalla("No se pudo bloquear la orientación: " + e);
    }
  }

  document.getElementById(overlayId).style.display = 'none';
  ajustarCanvas(canvas);
}

export function configurarPantalla(canvas, overlayId = 'pantallaInicio') {
  crearConsolaEnPantalla();
  const overlay = document.getElementById(overlayId);

  function mostrarOverlay() {
    overlay.style.display = 'flex';
    logPantalla("Mostrando overlay.");
  }

  overlay.addEventListener('click', () => {
    logPantalla("Overlay clicado.");
    iniciarPantallaCompleta(canvas, overlayId);
  });

  window.addEventListener('resize', () => {
    logPantalla("Ventana redimensionada.");
    ajustarCanvas(canvas);
  });

  window.addEventListener('orientationchange', () => {
    logPantalla("Cambio de orientación.");
    setTimeout(() => {
      ajustarCanvas(canvas);
      if (!document.fullscreenElement) {
        mostrarOverlay();
      }
    }, 300);
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      logPantalla("Pantalla completa desactivada.");
      mostrarOverlay();
    }
  });

  ajustarCanvas(canvas);
}