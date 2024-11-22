export interface Categories extends Omit<CategoriesResponse, "deletedAt"> {}

export interface CategoriesResponse {
  slug: string;
  name: string;
  url: string;
}
