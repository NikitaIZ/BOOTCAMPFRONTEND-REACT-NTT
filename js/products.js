const apiUrl = "https://dummyjson.com/products";

const productList = document.getElementById("product-list");
const searchInput = document.getElementById('search-input');

const productStock = new Map();
const userCart = new Map();

let currentPage = 1;
const productsPerPage = 9; 
let totalProducts = 0; 
let totalPages = 0; 

// Mapeador para un producto y filtrar solo lo que se necesita de la api
const mapperGetProduct = (data) => {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        discountPercentage: data.discountPercentage || 0,
        images: data.images,
        stock: data.stock || 0,   
        tags: data.tags || []
    };
};

// Mapeador para la lista de productos
const mapperListProduct = (data) => {
    return data.map((item) => mapperGetProduct(item));
};

// Función para modularizar los elementos
const createCardElement = (type, { className = '', id = '', textContent = '', src = '', alt = '', disabled = false, span = '' } = {}) => {
    const element = document.createElement(type);

    if (className) element.className = className;
    if (id) element.id = id;
    if (textContent) element.textContent = textContent;
    if (src) element.src = src;
    if (alt) element.alt = alt;
    if (disabled) element.disabled = disabled;
    if (span) element.span = span;
    return element;
};

// Función para limpiar la lista de productos del contenedor
const clearProductList = () => {
    productList.textContent = '';
};

// Función para renderizar la paginación
const renderPagination = () => {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.textContent = '';

    const prevButton = createCardElement('button', {
        textContent: ' < ',
        disabled: currentPage === 1
    });
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            getProducts(searchInput.value.trim(), currentPage);
        }
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createCardElement('button', {
            textContent: i,
            className: i === currentPage ? 'active' : ''
        });
        pageButton.addEventListener('click', () => {
            currentPage = i;
            getProducts(searchInput.value.trim(), currentPage);
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
            getProducts(searchInput.value.trim(), currentPage);
        }
    });
    paginationContainer.appendChild(nextButton);
};

// Función para guardar temporalmente informacion en el carrito con localStorage, almacena el id del producto y la cantidad
const saveCartToStorage = () => {
    const cartArray = Array.from(userCart.entries()); 
    localStorage.setItem('userCart', JSON.stringify(cartArray)); 
};

// Función para cargar la informacion del carrito desde localStorage
const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('userCart');
    if (savedCart) {
        const cartArray = JSON.parse(savedCart);
        return new Map(cartArray); 
    }
    return new Map(); 
};

// Función para determinar el estado del botón
const getButtonState = (product, userAdded) => {
    if (product.stock <= 0) {
        return {
            class: 'button-gray',
            text: 'Sold Out',
            disabled: true
        };
    } else if (userAdded >= product.stock) {
        return {
            class: 'button-red',
            text: 'Max Stock',
            disabled: true
        };
    } else {
        return {
            class: 'button-green',
            text: 'Add',
            disabled: false
        };
    }
};

// Función para manejar la dinámica del botón del producto con el carrito del usuario
const handleButtonClick = (product, button) => {
    const stockLeft = productStock.get(product.id); 
    let userAddedNow = userCart.get(product.id) || 0;

    // Verificar si hay stock suficiente
    if (stockLeft > 0 && userAddedNow < product.stock) {
        // Restar del stock disponible y sumar al carrito del usuario
        productStock.set(product.id, stockLeft - 1);
        userAddedNow += 1;
        userCart.set(product.id, userAddedNow); 

        saveCartToStorage();

        // Actualizar el stock en la interfaz
        const stockElement = document.getElementById(`stock-${product.id}`);
        if (stockElement) {
            stockElement.textContent = productStock.get(product.id);
        }

        // Cambiar el estado del botón según el nuevo stock
        const { class: buttonClass, text: buttonText, disabled } = getButtonState(product, userAddedNow);
        button.textContent = buttonText;
        button.className = buttonClass;
        button.disabled = disabled;
    }
};



// Función para crear el botón de las cartas
const createAddToCartButton = (product, userAdded) => {
    const buttonContainer = createCardElement('div', { className: 'button' });

    const { class: buttonClass, text: buttonText, disabled } = getButtonState(product, userAdded);

    const button = createCardElement('button', {
        className: buttonClass,
        textContent: buttonText,
        disabled: disabled
    });

    button.addEventListener('click', () => {
        handleButtonClick(product, button);
    });

    buttonContainer.appendChild(button);
    return buttonContainer;
};

// Función para renderizar los productos en el contenedor
const renderCardProducts = (products) => {
    clearProductList();

    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        const userAdded = userCart.get(product.id) || 0; 
        const LastStock = productStock.get(product.id) || 0; 

        const card = createCardElement('div', { className: 'card' });
        const cardBody = createCardElement('div', { className: 'card-body' });
        const cardInfo = createCardElement('div', { className: 'card-info' });
        const infoLine = createCardElement('div', { className: 'card-info-line' });
        const cardFooter = createCardElement('div', { className: 'card-footer' });

        // Imagen del producto
        const imageContainer = createCardElement('div', { className: 'card-image-container' });
        const image = createCardElement('img', { className: 'card-image', src: product.images[0] || 'default.jpg', alt: product.title || 'default' });
        imageContainer.appendChild(image);

        // Tags del producto
        const tagsContainer = createCardElement('div', { className: 'tags-container' });
        product.tags?.forEach(tag => {
            const tagDiv = createCardElement('div', { className: 'tag', textContent: `#${tag}` });
            tagsContainer.appendChild(tagDiv);
        });

        // Información del producto
        const title = createCardElement('h2', { textContent: product.title });
        const description = createCardElement('p', { textContent: product.description });

        // Precio y descuento
        const priceContainer = createCardElement('div', { className: 'price-container' });
        const price = createCardElement('h3', { textContent: `Price: $ ${new Intl.NumberFormat('en-US').format(product.price.toFixed(2))}` });

        priceContainer.appendChild(price);

        if (product.discountPercentage > 0) {
            const discountBadge = createCardElement('div', { 
                className: 'discount-badge', 
                textContent: `-${product.discountPercentage}%` 
            });
            priceContainer.appendChild(discountBadge);
        }

        // Stock
        const stock = createCardElement('p', { className: 'stock' });

        const stockTitle = createCardElement('span', {
            textContent: 'Stock'
        });

        const stockNumber = createCardElement('span', {
            id: `stock-${product.id}`, 
            textContent: `${LastStock}`
        });

        stock.append(stockTitle, stockNumber);

        // Crear y agregar el botón de añadir al carrito
        const buttonContainer = createAddToCartButton(product, userAdded);
        cardFooter.appendChild(buttonContainer);

        // Agregar elementos al contenedor de la línea de información
        infoLine.appendChild(priceContainer);
        infoLine.appendChild(stock);

        cardInfo.append(title, tagsContainer, description, infoLine, cardFooter);
        cardBody.append(imageContainer, cardInfo);
        card.append(cardBody);
        fragment.appendChild(card);
    });

    productList.appendChild(fragment);
};

// Función para obtener productos desde la API con paginación
const getProducts = async (search = '', page = 1) => {
    try {
        const category = window.location.hash.substring(1); // Extraer categoría de la URL
        const url = category 
            ? apiUrl + `/category/${category}`  // Si hay categoría, obtener productos de esa categoría
            : apiUrl;                           // Si no hay categoría, obtener todos los productos del inicio

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de los productos');
        }

        const data = await response.json();
        const products = mapperListProduct(data.products);

        // Cargar el carrito del almacenamiento local
        Object.assign(userCart, loadCartFromStorage());

        // Inicializar y ajustar el stock en función del carrito
        products.forEach(product => {
            const initialStock = product.stock || 0;
            const userAdded = userCart.get(product.id) || 0;

            // Si el producto tiene stock inicial 0, debe permanecer en 0
            const adjustedStock = initialStock - userAdded;
            productStock.set(product.id, Math.max(0, adjustedStock)); // Garantizar que nunca sea negativo
        });

        // Filtrar los productos por el título (si hay búsqueda)
        const filteredProducts = search 
            ? products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())) 
            : products;

        // Actualizar el total de productos y páginas
        totalProducts = filteredProducts.length;
        totalPages = Math.ceil(totalProducts / productsPerPage);

        // Obtener solo los productos de la página actual
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

        renderCardProducts(productsToDisplay);
        renderPagination(); 
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
};

// Función para manejar la búsqueda
const setupSearch = () => {
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        getProducts(query, currentPage);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setupSearch(); 
    getProducts();
    window.addEventListener('hashchange', () => getProducts(searchInput.value.trim()));
});