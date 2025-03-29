import { getData } from "./apiService";
import { Category } from "types/Categories/Category";
import { CategoriesResponse } from "types/Categories/CategoriesResponse";
import { Level } from "types/Categories/Level";
import { CategoryLevelsResponse } from "types/Categories/CategoryLevelsResponse";

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

  getCategoryLevels = async (categoryNumber: number): Promise<Level[] | null> => {
    const endpoint = `/Categories/get-levels-by-category/${categoryNumber}`;
    try {
      const response = await getData<CategoryLevelsResponse>(endpoint);
      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };
}
