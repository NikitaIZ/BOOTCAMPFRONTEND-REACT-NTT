const cartButton = document.querySelector('.cart-button');
const cartCounter = document.querySelector('.cart-counter');

let cartCount = 0;

// Agregar un evento de clic a los botones "Add"
document.addEventListener('click', (event) => {
    const target = event.target;
    if ((target.textContent.trim() === 'Add' || target.textContent.trim() === 'Max Stock' )&& target.closest('.button')) {
        cartCount += 1; 
        cartCounter.textContent = cartCount;

        if (!cartCounter.classList.contains('show')) {
            cartCounter.classList.add('show');
        }
    }
});