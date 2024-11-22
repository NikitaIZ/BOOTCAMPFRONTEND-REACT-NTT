import { Categories } from "../domain/categories";

const categoriesApiUrl = "https://dummyjson.com/products/categories";

const getCategories = async (): Promise<Categories> => {
  try {
    const response = await fetch(categoriesApiUrl);

    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de categorías");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Categories network error");
  }
};

export const categoriesRequest = {
  getCategories,
};
