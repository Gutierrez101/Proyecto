document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('btn_carrito');
    const cartModal = document.getElementById('carritoM');
    const closeModal = document.querySelector('.cerrado');
    const cartContainer = document.querySelector('.contenedor p');
    const checkoutButton = document.querySelector('.checkout-btn');
    const addToCartButtons = document.querySelectorAll('.carrito_button');
    
    let cart = [];

    // Verificar que los elementos existen
    if (!cartButton || !cartModal || !closeModal || !cartContainer || !checkoutButton) {
        console.error('Algunos elementos del carrito no fueron encontrados en el DOM.');
        return; // Detener la ejecución si faltan elementos
    }

    // Abrir el carrito
    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
        actualizarCarrito();
    });

    // Cerrar el carrito
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Agregar productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            if (!productElement) return;

            const productName = productElement.querySelector('h3')?.textContent || 'Producto desconocido';
            const productModel = productElement.getAttribute('data-model') || 'N/A';
            const productPrice = productElement.getAttribute('data-price') || '0.00';

            cart.push({
                name: productName,
                model: productModel,
                price: parseFloat(productPrice)
            });

            actualizarCarrito();
        });
    });

    function actualizarCarrito() {
        cartContainer.innerHTML = cart.length === 0
            ? 'No tienes productos en el carrito aún'
            : cart.map(product => `<p>${product.name} (Modelo: ${product.model}) - $${product.price.toFixed(2)}</p>`).join('');
    }

    // Generar factura en PDF
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        const doc = new jsPDF();
        let y = 20;

        doc.setFont('times');
        doc.setFontSize(18);
        doc.text(90, 10, "Factura");

        doc.setFontSize(12);
        doc.text(10, y, 'Nombre del Producto');
        doc.text(80, y, 'Modelo');
        doc.text(150, y, 'Precio');

        cart.forEach((product) => {
            y += 10;
            doc.text(10, y, product.name);
            doc.text(80, y, product.model);
            doc.text(150, y, `$${product.price.toFixed(2)}`);
        });

        const total = cart.reduce((sum, product) => sum + product.price, 0);
        y += 15;
        doc.text(10, y, `Total a pagar: $${total.toFixed(2)}`);

        doc.save("Factura.pdf");
    });
});
