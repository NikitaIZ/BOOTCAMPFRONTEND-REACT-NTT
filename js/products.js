const apiUrl = "https://dummyjson.com/products";

const productList = document.getElementById("product-list");
const searchInput = document.getElementById('search-input');

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

// Función para renderizar las cartas de productos
const renderCardProducts = (products) => {

    clearProductList();

    products.forEach(product => {
        // Crear tarjeta
        const card = createCardElement('div', { className: 'card' });
        const cardBody = createCardElement('div', { className: 'card-body' });
        const cardInfo = createCardElement('div', { className: 'card-info' });
        const cardFooter = createCardElement('div', { className: 'card-footer' });

        // Imagen del producto
        const imageContainer = createCardElement('div', { className: 'card-image-container' });
        const image = createCardElement('img', { className: 'card-image', src: product.images[0] || 'default.jpg', alt: product.title || 'default' });
        imageContainer.appendChild(image);

        // Información del producto
        const title = createCardElement('h2', { textContent: product.title });
        const description = createCardElement('p', { textContent: product.description });
        const price = createCardElement('h3', { textContent: `Price: $ ${new Intl.NumberFormat('en-US').format(product.price.toFixed(2))}` });

        // Etiquetas
        const tagsContainer = createCardElement('div', { className: 'tags-container' });
        product.tags?.forEach(tag => {
            const tagDiv = createCardElement('div', { className: 'tag', textContent: `#${tag}` });
            tagsContainer.appendChild(tagDiv);
        });

        cardInfo.append(title, description, tagsContainer, price);
        cardBody.append(imageContainer, cardInfo);

        // Botón de añadir o agotado (Ejemplo en la categoria vehicle)
        const buttonContainer = createCardElement('div', { className: 'button' });
        const button = createCardElement('button', {
            id: product.stock > 0 ? 'button-green' : 'button-gray',
            textContent: product.stock > 0 ? 'Add' : 'Sold Out'
        });

        buttonContainer.appendChild(button);
        cardFooter.appendChild(buttonContainer);

        card.append(cardBody, cardFooter);
        productList.appendChild(card);
    });
};

// Función para obtener productos desde la API, donde es opcional dos elementos para el buscador o las categorias
const getProducts = async (search = '') => {
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

        // Filtrar los productos por el título (si hay búsqueda)
        const filteredProducts = search 
            ? products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())) 
            : products;

        renderCardProducts(filteredProducts);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
};

// Función para la busqueda
const setupSearch = () => {
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        getProducts(query);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setupSearch(); 
    getProducts();
    window.addEventListener('hashchange', () => getProducts(searchInput.value.trim()));
});