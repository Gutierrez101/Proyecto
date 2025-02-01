document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos del DOM
    const cartButton = document.getElementById('btnCarrito');
    const cartModal = document.getElementById('carritoM');
    const closeModal = document.querySelector('.cerrado');

    // Mostrar el modal al hacer clic en "Tu carrito"
    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    // Cerrar el modal al hacer clic en la "X"
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});
