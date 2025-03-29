import { makeAutoObservable } from "mobx";
import { CategoriesService } from "services/categoriesService";
import { Category } from "types/Categories/Category";
import { Level } from "types/Categories/Level";


class CategoriesStore {
  categories: Category[] = [];
  levels: Level[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }
  setLevels(levels: Level[]) {
    this.levels = levels;
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

  async fetchCategoryLevels(categoryNumber: number) {
    const categoriesService = new CategoriesService();
    const response = await categoriesService.getCategoryLevels(categoryNumber);

    if (response) {
      this.setLevels(response);
    } else {
      console.error("Failed to fetch categories:");
    }
  }
}

export const categoriesStore = new CategoriesStore();