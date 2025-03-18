import { getData, postData } from "./apiService";
import { LoginResponse } from "types/Login/LoginResponse";
import { LoginRequest } from "types/Login/LoginRequest";
import { RegisterRequest } from "types/Registration/RegisterRequest";
import { RegisterResponse } from "types/Registration/RegisterResponse";
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