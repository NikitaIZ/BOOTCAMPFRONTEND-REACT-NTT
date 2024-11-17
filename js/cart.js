const cartButton = document.querySelector('.cart-button');
const cartCounter = document.querySelector('.cart-counter');

let cartCount = 0;

// Agregar un evento de clic a los botones "Add"
document.addEventListener('click', (event) => {
    if (event.target.textContent === 'Add') {
        cartCount++;
        cartCounter.textContent = cartCount;
        if (!cartCounter.classList.contains('show')) {
            cartCounter.classList.add('show');
        }
    }
});

// Al hacer click al carrito se resetea el counter
cartButton.addEventListener('click', () => {
    cartCount = 0;
    cartCounter.textContent = cartCount;
    cartCounter.classList.remove('show'); 
});

