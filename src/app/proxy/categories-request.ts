import { Categories } from "../domain/interfaces/categories";

const categoriesApiUrl = "https://dummyjson.com/products/categories";

const getCategories = async (): Promise<Categories[]> => {
  try {
    const response = await fetch(categoriesApiUrl);

    if (!response.ok) {
      throw new Error("Could not get list of categories");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Categories network error");
  }
};


export const categoriesRequest = {
  getCategories,
};