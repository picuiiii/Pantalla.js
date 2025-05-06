// menu.js

export function crearMenuDesplegable() {
    const menuContainer = document.createElement('div');
    menuContainer.style.position = 'absolute';
    menuContainer.style.top = '10px';
    menuContainer.style.left = '10px';
    menuContainer.style.zIndex = '1000';

    const menuButton = document.createElement('button');
    menuButton.textContent = '☰';
    menuButton.style.padding = '10px 20px';
    menuButton.style.fontSize = '16px';
    menuButton.style.border = 'none';
    menuButton.style.borderRadius = '5px';
    menuButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    menuButton.style.color = 'white';
    menuButton.style.cursor = 'pointer';

    const menu = document.createElement('div');
    menu.style.display = 'none';
    menu.style.position = 'absolute';
    menu.style.top = '50px';
    menu.style.left = '0';
    menu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    menu.style.borderRadius = '5px';
    menu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    const opciones = [
        { texto: 'Inicio', accion: () => alert('Inicio') },
        { texto: 'Configuración', accion: () => alert('Configuración') },
        { texto: 'Salir', accion: () => alert('Salir') }
    ];

    opciones.forEach(op => {
        const item = document.createElement('a');
        item.textContent = op.texto;
        item.href = '#';
        item.style.display = 'block';
        item.style.padding = '10px 20px';
        item.style.color = 'white';
        item.style.textDecoration = 'none';
        item.addEventListener('click', (e) => {
            e.preventDefault();
            op.accion();
            menu.style.display = 'none';
        });
        menu.appendChild(item);
    });

    menuButton.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(menu);
    document.body.appendChild(menuContainer);
}

