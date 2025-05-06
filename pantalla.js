// pantalla.js

export function modoJugar() {
    alert('Has seleccionado Modo Jugar');
    // Aquí puedes agregar la lógica para el modo jugar
}

export function modoConstruir() {
    alert('Has seleccionado Modo Construir');
    // Aquí puedes agregar la lógica para el modo construir
}

export function configurarControles() {
    alert('Configurar Controles seleccionado');
    // Aquí puedes agregar la lógica para configurar los controles
}

export function configurarVolumen() {
    alert('Configurar Volumen seleccionado');
    // Aquí puedes agregar la lógica para configurar el volumen
}

export function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

export function solicitarPantallaCompleta() {
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

export function verificarOrientacion() {
    if (window.innerHeight > window.innerWidth) {
        alert('Por favor, gira tu dispositivo para ver el contenido en horizontal.');
    } else {
        solicitarPantallaCompleta();
    }
}