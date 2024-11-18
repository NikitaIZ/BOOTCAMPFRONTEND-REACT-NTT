import { Product } from './interfaces/product'; 

(() => {
    const apiUrl = "https://dummyjson.com/products";

    let productList: HTMLElement | null = document.getElementById("product-list") as HTMLElement;
    let searchInput: HTMLInputElement | null = document.getElementById('search-input') as HTMLInputElement;

    let productStock: Map<number, number> = new Map();
    let userCart: Map<number, number> = new Map();

    let currentPage: number = 1;
    const productsPerPage: number = 9; 
    let totalProducts: number = 0; 
    let totalPages: number = 0;

    const mapperGetProduct = (data: Product): Product => ({
        ...data,
        discountPercentage: data.discountPercentage || 0,
        images: data.images || [],
        stock: data.stock || 0,
        tags: data.tags || []
    });

    const mapperListProduct = (data: Product[]): Product[] => {
        return data.map((item: any) => mapperGetProduct(item));
    };

    const createCardElement = (
        type: string, 
        { className = '', id = '', textContent = '', src = '', alt = '', disabled = false }: 
        { className?: string; id?: string; textContent?: string; src?: string; alt?: string; disabled?: boolean } = {}
    ): HTMLElement => {
        const element = document.createElement(type) as HTMLElement;

        if (className) element.className = className;
        if (id) element.id = id;
        if (textContent) element.textContent = textContent;
        if (src) (element as HTMLImageElement).src = src;
        if (alt) (element as HTMLImageElement).alt = alt;
        if (disabled) (element as HTMLButtonElement).disabled = disabled;

        return element;
    };

    const clearProductList = (): void => {
        if (productList) {
            productList.textContent = '';
        }
    };

    const renderPagination = (): void => {
        const paginationContainer = document.getElementById('pagination-container');
        if (!paginationContainer) return;
    
        paginationContainer.textContent = '';
    
        const prevButton = createCardElement('button', {
            textContent: ' < ',
            disabled: currentPage === 1
        });
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                getProducts(searchInput?.value.trim() || '', currentPage);
            }
        });
        paginationContainer.appendChild(prevButton);
    
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createCardElement('button', {
                textContent: i.toString(),
                className: i === currentPage ? 'active' : ''
            });
            pageButton.addEventListener('click', () => {
                currentPage = i;
                getProducts(searchInput?.value.trim() || '', currentPage);
            });
            paginationContainer.appendChild(pageButton);
        }
    
        const nextButton = createCardElement('button', {
            textContent: ' > ',
            disabled: currentPage === totalPages
        });
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                getProducts(searchInput?.value.trim() || '', currentPage);
            }
        });
        paginationContainer.appendChild(nextButton);
    };    

    const saveCartToStorage = (): void => {
        const cartArray = Array.from(userCart.entries()); 
        localStorage.setItem('userCart', JSON.stringify(cartArray)); 
    };

    const loadCartFromStorage = (): Map<number, number> => {
        const savedCart = localStorage.getItem('userCart');
        if (savedCart) {
            const cartArray: [number, number][] = JSON.parse(savedCart);
            return new Map(cartArray); 
        }
        return new Map(); 
    };

    const getButtonState = (product: Product, userAdded: number) => {
        if (product.stock <= 0) {
            return { class: 'button-gray', text: 'Sold Out', disabled: true };
        } else if (userAdded >= product.stock) {
            return { class: 'button-red', text: 'Max Stock', disabled: true };
        } else {
            return { class: 'button-green', text: 'Add', disabled: false };
        }
    };

    const handleButtonClick = (product: Product, button: HTMLButtonElement): void => {
        const stockLeft = productStock.get(product.id) || 0; 
        let userAddedNow = userCart.get(product.id) || 0;

        if (stockLeft > 0 && userAddedNow < product.stock) {
            productStock.set(product.id, stockLeft - 1);
            userAddedNow += 1;
            userCart.set(product.id, userAddedNow); 

            saveCartToStorage();

            const stockElement = document.getElementById(`stock-${product.id}`);
            if (stockElement) {
                stockElement.textContent = productStock.get(product.id)?.toString() || '';
            }

            const { class: buttonClass, text: buttonText, disabled } = getButtonState(product, userAddedNow);
            button.textContent = buttonText;
            button.className = buttonClass;
            button.disabled = disabled;
        }
    };

    const createAddToCartButton = (product: Product, userAdded: number): HTMLElement => {
        const buttonContainer: HTMLElement = createCardElement('div', { className: 'button' });

        const { class: buttonClass, text: buttonText, disabled } = getButtonState(product, userAdded);

        const button: HTMLButtonElement = createCardElement('button', {
            className: buttonClass,
            textContent: buttonText,
            disabled: disabled,
        }) as HTMLButtonElement;

        button.addEventListener('click', () => {
            handleButtonClick(product, button);
        });

        buttonContainer.appendChild(button);
        return buttonContainer;
    };

    const renderCardProducts = (products: Product[]): void => {
        clearProductList();

        const fragment: DocumentFragment = document.createDocumentFragment();
        products.forEach((product) => {
            const userAdded = userCart.get(product.id) || 0;
            const LastStock = productStock.get(product.id) || 0;

            const card: HTMLElement = createCardElement('div', { className: 'card' });
            const cardBody: HTMLElement = createCardElement('div', { className: 'card-body' });
            const cardInfo: HTMLElement = createCardElement('div', { className: 'card-info' });
            const infoLine: HTMLElement = createCardElement('div', { className: 'card-info-line' });
            const cardFooter: HTMLElement = createCardElement('div', { className: 'card-footer' });

            const imageContainer: HTMLElement = createCardElement('div', { className: 'card-image-container' });
            const image: HTMLImageElement = createCardElement('img', {
                className: 'card-image',
                src: product.images[0] || 'default.jpg',
                alt: product.title || 'default',
            }) as HTMLImageElement;
            imageContainer.appendChild(image);

            const tagsContainer: HTMLElement = createCardElement('div', { className: 'tags-container' });
            product.tags?.forEach((tag) => {
                const tagDiv: HTMLElement = createCardElement('div', { className: 'tag', textContent: `#${tag}` });
                tagsContainer.appendChild(tagDiv);
            });

            const title: HTMLElement = createCardElement('h2', { textContent: product.title });
            const description: HTMLElement = createCardElement('p', { textContent: product.description });

            const priceContainer: HTMLElement = createCardElement('div', { className: 'price-container' });
            const price: HTMLElement = createCardElement('h3', {
                textContent: `Price: $ ${new Intl.NumberFormat('en-US').format(Number(product.price.toFixed(2)))}`,
            });

            priceContainer.appendChild(price);

            if (product.discountPercentage > 0) {
                const discountBadge: HTMLElement = createCardElement('div', {
                    className: 'discount-badge',
                    textContent: `-${product.discountPercentage}%`,
                });
                priceContainer.appendChild(discountBadge);
            }

            const stock: HTMLElement = createCardElement('p', { className: 'stock' });

            const stockTitle: HTMLElement = createCardElement('span', {
                textContent: 'Stock',
            });

            const stockNumber: HTMLElement = createCardElement('span', {
                id: `stock-${product.id}`,
                textContent: `${LastStock}`,
            });

            stock.append(stockTitle, stockNumber);

            const buttonContainer = createAddToCartButton(product, userAdded);
            cardFooter.appendChild(buttonContainer);

            infoLine.appendChild(priceContainer);
            infoLine.appendChild(stock);

            cardInfo.append(title, tagsContainer, description, infoLine, cardFooter);
            cardBody.append(imageContainer, cardInfo);
            card.append(cardBody);
            fragment.appendChild(card);
        });

        productList?.appendChild(fragment);
    };

    const getProducts = async (search: string = '', page: number = 1): Promise<void> => {
        try {
            const category: string = window.location.hash.substring(1); 
            const url: string = category
                ? `${apiUrl}/category/${category}`  
                : apiUrl;                          
    
            const response: Response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de los productos');
            }
    
            const data = await response.json();
            const products: Product[] = mapperListProduct(data.products);
    
            Object.assign(userCart, loadCartFromStorage());
    
            products.forEach((product) => {
                const initialStock: number = product.stock || 0;
                const userAdded: number = userCart.get(product.id) || 0;
    
                const adjustedStock: number = initialStock - userAdded;
                productStock.set(product.id, Math.max(0, adjustedStock));
            });
    
            const filteredProducts: Product[] = search
                ? products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
                : products;
    
            totalProducts = filteredProducts.length;
            totalPages = Math.ceil(totalProducts / productsPerPage);
    
            if (currentPage > totalPages) {
                currentPage = 1;
            }
    
            const startIndex: number = (currentPage - 1) * productsPerPage;
            const endIndex: number = startIndex + productsPerPage;
            const productsToDisplay: Product[] = filteredProducts.slice(startIndex, endIndex);
    
            renderCardProducts(productsToDisplay);
            renderPagination();
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };    

    const setupSearch = (): void => {
        if (searchInput) {
            searchInput.addEventListener('input', (event: Event) => {
                const query: string = (event.target as HTMLInputElement).value.trim();
                currentPage = 1;
                getProducts(query, currentPage);
            });
        }
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        setupSearch();
        getProducts();
        window.addEventListener('hashchange', () => {
            if (searchInput) {
                currentPage = 1; 
                getProducts(searchInput.value.trim());
            }
        });
    });
})();