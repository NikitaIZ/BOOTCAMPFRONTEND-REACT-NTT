(() => {
const apiCategoryUrl: string = "https://dummyjson.com/products/category-list";

type Category = string;

const getCategories = async (): Promise<void> => {
    try {
        const response: Response = await fetch(apiCategoryUrl);

        if (!response.ok) {
            throw new Error("No se pudo obtener la lista de categorías");
        }

        const categories: Category[] = await response.json();
        const categoriesMenu = document.getElementById("categories-menu");

        if (!categoriesMenu) {
            throw new Error("No se encontró el elemento con ID 'categories-menu'");
        }

        categories.forEach((category: Category) => {
            const categoryLink: HTMLAnchorElement = document.createElement("a");
            categoryLink.href = `#${category}`;
            categoryLink.textContent = formatCategoryName(category);
            categoryLink.addEventListener("click", () => handleCategoryClick(category));
            categoriesMenu.appendChild(categoryLink);
        });
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
    }
};

const formatCategoryName = (category: string): string => {
    return category.replace(/-/g, " ").replace(/\b\w/g, (char: string) => char.toUpperCase());
};

const handleCategoryClick = (category: string): void => {
    window.location.hash = category; 
};

getCategories();
})();
