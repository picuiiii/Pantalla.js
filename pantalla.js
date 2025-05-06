// pantalla.js

// Función para solicitar pantalla completa
function solicitarPantallaCompleta() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Función para aplicar estilo 16:9 centrado
function aplicarEstiloPantalla() {
    const body = document.body;
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.overflow = 'hidden';
    body.style.display = 'flex';
    body.style.justifyContent = 'center';
    body.style.alignItems = 'center';
    body.style.backgroundColor = '#000';

    // Eliminar si ya existe
    const anterior = document.getElementById('pantalla16_9');
    if (anterior) anterior.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'pantalla16_9';
    wrapper.style.width = '100vw';
    wrapper.style.height = '56.25vw'; // Proporción 16:9
    wrapper.style.maxHeight = '100vh';
    wrapper.style.backgroundColor = '#111';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.color = 'white';
    wrapper.style.fontSize = '24px';
    wrapper.innerHTML = 'Pantalla 16:9 activa';

    body.appendChild(wrapper);
}

// Verifica la orientación del dispositivo
function verificarOrientacion() {
    if (window.innerHeight > window.innerWidth) {
        alert('Por favor, gira tu dispositivo para ver el contenido en horizontal.');
    } else {
        solicitarPantallaCompleta();
        aplicarEstiloPantalla();
    }
}

// Ejecutar al cargar la página
window.addEventListener('load', verificarOrientacion);
window.addEventListener('resize', verificarOrientacion);