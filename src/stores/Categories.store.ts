import { makeAutoObservable } from "mobx";
import { CategoriesService } from "services/categoriesService";
import { Category } from "types/Categories/Category";
import { Level } from "types/Categories/Level";

class CategoriesStore {
  categories: Category[] = [];
  levels: Level[] = [];
  categoriesFetched: boolean = false;
  isLoading: boolean = false;
  fetchPromise: Promise<void> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.categoriesFetched = true;
  }
  setLevels(levels: Level[]) {
    this.levels = levels;
  }

  async fetchCategories() {
    // If categories are already fetched, return immediately
    if (this.categoriesFetched) {
      return;
    }

    // If already loading, return the existing promise
    if (this.isLoading && this.fetchPromise) {
      return this.fetchPromise;
    }

    // Set loading state and create a new promise
    this.isLoading = true;
    this.fetchPromise = (async () => {
      try {
        const categoriesService = new CategoriesService();
        const response = await categoriesService.getCategories();

        if (response) {
          this.setCategories(response);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        this.isLoading = false;
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
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
