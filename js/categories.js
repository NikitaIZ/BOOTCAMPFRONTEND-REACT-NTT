const apiCategoryUrl = "https://dummyjson.com/products/category-list";

// Obtener las categorías de la API
const getCategories = async () => {
    try {
        const response = await fetch(apiCategoryUrl);

        if (!response.ok) {
            throw new Error("No se pudo obtener la lista de categorías");
        }

        const categories = await response.json();
        const categoriesMenu = document.getElementById("categories-menu");

        categories.forEach(category => {
            const categoryLink = document.createElement("a");
            categoryLink.href = `#${category}`;
            categoryLink.textContent = formatCategoryName(category);
            categoryLink.addEventListener("click", () => handleCategoryClick(category));
            categoriesMenu.appendChild(categoryLink);
        });
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
    }
};

// Función para formatear el nombre de la categoría (reemplazar guiones por espacios, capitalizar) Ejemplo: mens-shirts => Mens Shirts
const formatCategoryName = (category) => {
    return category.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());
};

const handleCategoryClick = (category) => {
    window.location.hash = category; 
};

getCategories();