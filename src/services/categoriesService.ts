import { getData } from "./apiService";
import { Category } from "types/Categories/Category";
import { CategoriesResponse } from "types/Categories/CategoriesResponse";

export class CategoriesService {
  getCategories = async (): Promise<Category[] | null> => {
    const endpoint = "/Categories/get-categories";
    try {
      const response = await getData<CategoriesResponse>(endpoint);
      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };
}
