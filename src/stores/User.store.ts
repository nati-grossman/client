import { makeAutoObservable } from "mobx";

export class UserStore {
  user: string | null = null;
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
    // Load token from localStorage on initialization
    this.token = localStorage.getItem("authToken");
  }

  setUser(user: string) {
    this.user = user;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }

  clearUser() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("authToken");
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
}

export const userStore = new UserStore();
