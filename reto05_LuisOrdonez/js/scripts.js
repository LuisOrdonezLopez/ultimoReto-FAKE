document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById('toggle-mode');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelectorAll('.header, .footer').forEach(el => el.classList.toggle('dark-mode'));
        toggleButton.classList.toggle('dark-mode');
        toggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
    });

    window.onload = function() {
        document.getElementById('loader').style.display = 'none';
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function agregarAlCarrito(producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        mostrarNotificacion('Producto agregado al carrito');
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function actualizarCarrito() {
        const listaArticulos = document.querySelector('.lista-articulos');
        listaArticulos.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            const articulo = document.createElement('div');
            articulo.classList.add('articulo');
            articulo.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            listaArticulos.appendChild(articulo);
            total += producto.precio * producto.cantidad;
        });

        document.querySelector('.total-carrito h3').textContent = `Total: $${total.toFixed(2)}`;
    }

    function actualizarCantidad(index, cantidad) {
        carrito[index].cantidad = parseInt(cantidad);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function mostrarNotificacion(mensaje) {
        const notification = document.getElementById('notification');
        notification.textContent = mensaje;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    window.filtrarProductos = function() {
        const input = document.getElementById('search');
        const filter = input.value.toLowerCase();
        const productos = document.querySelectorAll('.producto');

        productos.forEach(producto => {
            const nombre = producto.getAttribute('data-nombre').toLowerCase();
            producto.style.display = nombre.includes(filter) ? '' : 'none';
        });
    };

    window.filtrarPorCategoria = function(categoria) {
        const productos = document.querySelectorAll('.producto');
        productos.forEach(producto => {
            producto.style.display = producto.getAttribute('data-categoria') === categoria ? '' : 'none';
        });
    };

    window.mostrarTodos = function() {
        const productos = document.querySelectorAll('.producto');
        productos.forEach(producto => {
            producto.style.display = '';
        });
    };

    window.openTab = function(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    };
});