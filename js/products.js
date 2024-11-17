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
        tags: data.tags || [], 
        availabilityStatus: data.availabilityStatus || 'Unknown' 
    };
};

// Mapeador para la lista de productos
const mapperListProduct = (data) => {
    return data.map((item) => mapperGetProduct(item));
};

// Función para modularizar los elementos
const createCardElement = (type, { className = '', id = '', textContent = '', src = '', alt = '', disabled = false } = {}) => {
    const element = document.createElement(type);

    if (className) element.className = className;
    if (id) element.id = id;
    if (textContent) element.textContent = textContent;
    if (src) element.src = src;
    if (alt) element.alt = alt;
    if (disabled) element.disabled = disabled;

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

    // Botón "Anterior"
    const prevButton = createCardElement('button', {
        textContent: 'Anterior',
        disabled: currentPage === 1
    });
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            getProducts(searchInput.value.trim(), currentPage);
        }
    });
    paginationContainer.appendChild(prevButton);

    // Páginas numeradas
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

    // Botón "Siguiente"
    const nextButton = createCardElement('button', {
        textContent: 'Siguiente',
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

    // Verificar si el producto ya está agotado
    if (stockLeft <= 0 || userAddedNow >= product.stock) {
        return;
    }

    // Restamos del stock y sumamos al carrito del usuario
    productStock.set(product.id, stockLeft - 1);
    userAddedNow += 1;
    userCart.set(product.id, userAddedNow); 

    cartCounter.textContent = parseInt(cartCounter.textContent) + 1;
    saveCartToStorage();

    // Actualizar el stock en la interfaz
    const stockElement = document.getElementById(`stock-${product.id}`);
    if (stockElement) {
        stockElement.textContent = `Stock: ${productStock.get(product.id)}`;
    }

    // Cambiar el estado del botón según el nuevo stock
    if (userAddedNow >= product.stock) {
        button.textContent = 'Max Stock';
        button.id = 'button-red';
        button.disabled = true;
    } else {
        button.textContent = 'Add';
        button.id = 'button-green';
        button.disabled = false;
    }
};


// Función para crear el botón de las cartas
const createAddToCartButton = (product, userAdded) => {
    const buttonContainer = createCardElement('div', { className: 'button' });

    const { class: buttonClass, text: buttonText, disabled } = getButtonState(product, userAdded);

    const button = createCardElement('button', {
        id: buttonClass,
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
    Object.assign(userCart, loadCartFromStorage());

    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        const userAdded = userCart.get(product.id) || 0;
        const card = createCardElement('div', { className: 'card' });
        const cardBody = createCardElement('div', { className: 'card-body' });
        const cardInfo = createCardElement('div', { className: 'card-info' });
        const infoLine = createCardElement('div', { className: 'card-info-line' });
        const cardFooter = createCardElement('div', { className: 'card-footer' });

        // Imagen del producto
        const imageContainer = createCardElement('div', { className: 'card-image-container' });
        const image = createCardElement('img', { className: 'card-image', src: product.images[0] || 'default.jpg', alt: product.title || 'default' });
        imageContainer.appendChild(image);

        // Información del producto
        const title = createCardElement('h2', { textContent: product.title });
        const description = createCardElement('p', { textContent: product.description });

        const price = createCardElement('h3', { textContent: `Price: $ ${new Intl.NumberFormat('en-US').format(product.price.toFixed(2))}` });
        const stock = createCardElement('p', { id: `stock-${product.id}`, textContent: `Stock: ${productStock.get(product.id) || product.stock}` });

        infoLine.appendChild(price);
        infoLine.appendChild(stock);
        
        // Crear y agregar el botón de añadir al carrito
        const buttonContainer = createAddToCartButton(product, userAdded);
        cardFooter.appendChild(buttonContainer);

        cardInfo.append(title, description, infoLine); // Agregar stock al contenido
        cardBody.append(imageContainer, cardInfo);
        card.append(cardBody, cardFooter);
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

        // Inicializar productStock para todos los productos
        products.forEach(product => {
            if (!productStock.has(product.id)) {
                productStock.set(product.id, product.stock || 0);
            }
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