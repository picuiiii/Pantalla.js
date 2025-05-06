let modoDebug = true;
let consola;

export function mostrarDebug(activar = true) {
  modoDebug = activar;
  if (modoDebug && !document.getElementById('consolaPantalla')) {
    consola = document.createElement('pre');
    consola.id = 'consolaPantalla';
    consola.style.position = 'fixed';
    consola.style.bottom = '0';
    consola.style.left = '0';
    consola.style.color = 'lime';
    consola.style.background = 'rgba(0,0,0,0.5)';
    consola.style.fontSize = '1em';
    consola.style.padding = '0.5em';
    consola.style.margin = '0';
    consola.style.zIndex = '9999';
    consola.style.maxHeight = '50%';
    consola.style.overflowY = 'auto';
    document.body.appendChild(consola);

    window.debugLog = function (texto) {
      consola.textContent += texto + '\n';
      consola.scrollTop = consola.scrollHeight;
      console.log(texto);
    };
  } else {
    window.debugLog = function () {};
  }
}

export function configurarPantalla(canvas) {
  mostrarDebug(true);
  if (!canvas) {
    debugLog('Error: Canvas no encontrado.');
    return;
  }

  function ajustarCanvas() {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    const proporcion = 16 / 9;
    let nuevoAncho = ancho;
    let nuevoAlto = ancho / proporcion;

    if (nuevoAlto > alto) {
      nuevoAlto = alto;
      nuevoAncho = alto * proporcion;
    }

    canvas.width = 640;
    canvas.height = 360;

    canvas.style.width = `${nuevoAncho}px`;
    canvas.style.height = `${nuevoAlto}px`;

    debugLog(`Canvas ajustado: ${canvas.width}x${canvas.height}`);
  }

  function bloquearOrientacion() {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').then(() => {
        debugLog('Orientación bloqueada a paisaje.');
      }).catch(err => {
        debugLog('No se pudo bloquear la orientación: ' + err);
      });
    } else {
      debugLog('La orientación no se puede bloquear en este navegador.');
    }
  }

  window.addEventListener('resize', () => {
    debugLog('Ventana redimensionada.');
    ajustarCanvas();
  });

  window.addEventListener('orientationchange', () => {
    debugLog('Cambio de orientación.');
    bloquearOrientacion();
    setTimeout(ajustarCanvas, 500);
  });

  ajustarCanvas();
  bloquearOrientacion();
}