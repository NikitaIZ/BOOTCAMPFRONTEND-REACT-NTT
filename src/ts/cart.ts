(() => {
    const cartCounter = document.querySelector<HTMLElement>('.cart-counter');

    // tipado implicito
    let cartCount = 0;

    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        // palabras m'agicas como 'Add'  'Max Stock' en validaciones es mejor ponerlas  ponerlas en un enum 
        if ((target.textContent?.trim() === 'Add' || target.textContent?.trim() === 'Max Stock') && target.closest('.button')) {
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
