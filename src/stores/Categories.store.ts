import { makeAutoObservable } from "mobx";
import { CategoriesService } from "services/categoriesService";

interface Category {
  categoryNumber: number;
  categoryName: string;
}

class CategoriesStore {
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  async fetchCategories() {
    const categoriesService = new CategoriesService();
    const response = await categoriesService.getCategories();

    if (response) {
      this.setCategories(response);
    } else {
      console.error("Failed to fetch categories:");
    }
  }
}

export const categoriesStore = new CategoriesStore();