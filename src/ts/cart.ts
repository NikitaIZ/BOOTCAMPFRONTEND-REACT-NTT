(() => {
const cartCounter: HTMLElement | null = document.querySelector('.cart-counter');

let cartCount: number = 0;

// Agregar un evento de clic a los botones "Add"
document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (
        (target.textContent?.trim() === 'Add' || target.textContent?.trim() === 'Max Stock') &&
        target.closest('.button')
    ) {
        cartCount += 1;

        if (cartCounter) {
            cartCounter.textContent = cartCount.toString();

            if (!cartCounter.classList.contains('show')) {
                cartCounter.classList.add('show');
            }
        }
    }
});
})();
