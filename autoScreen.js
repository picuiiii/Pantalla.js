
función de exportación ajustarCanvas(canvas) {
  relación constante = 16 / 9;
  deje que ancho = ventana.anchointerno;
  deje altura = ventana.alturaInterna;

  si (ancho/alto > relación) {
    ancho = alto * relación;
  } demás {
    altura = ancho / relación;
  }

  lienzo.ancho = ancho;
  lienzo.altura = altura;
  lienzo.estilo.ancho = ancho + "px";
  lienzo.estilo.altura = altura + "px";
}

exportar función asíncrona iniciarPantallaCompleta(canvas, overlayId = 'pantallaInicio') {
  const elem = documento.documentElement;

  si (elem.requestFullscreen) esperar elem.requestFullscreen();
  de lo contrario si (elem.webkitRequestFullscreen) esperar elem.webkitRequestFullscreen();
  de lo contrario si (elem.msRequestFullscreen) esperar elem.msRequestFullscreen();

  si (pantalla.orientación && pantalla.orientación.bloqueo) {
    intentar {
      esperar pantalla.orientación.lock("paisaje");
    } captura (e) {
      console.warn("No se pudo bloquear la orientación:", e);
    }
  }

  documento.getElementById(overlayId).style.display = 'ninguno';
  ajustarCanvas(lienzo);
}

función de exportación configurarPantalla(canvas, overlayId = 'pantallaInicio') {
  constante superposición = document.getElementById(overlayId);

  función mostrarOverlay() {
    superposición.estilo.display = 'flex';
  }

  superposición.addEventListener('click', () => iniciarPantallaCompleta(canvas, overlayId));
  ventana.addEventListener('resize', () => ajustarCanvas(canvas));
  ventana.addEventListener('cambio de orientación', () => {
    establecerTiempo de espera(() => {
      ajustarCanvas(lienzo);
      si (!documento.fullscreenElement) {
        mostrarOverlay();
      }
    }, 300);
  });

  document.addEventListener('cambio de pantalla completa', () => {
    si (!documento.fullscreenElement) {
      mostrarOverlay();
    }
  });

  ajustarCanvas(lienzo);
}

