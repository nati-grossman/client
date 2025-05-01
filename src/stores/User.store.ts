import { makeAutoObservable } from "mobx";
import { User } from "types/User/User";

class UserStore {
  user: User | null = null;
  isLoggedIn = false;
  token: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
    this.isLoggedIn = true;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }
  isTokenExists(): boolean {
    const token = localStorage.getItem("authToken");
    return token !== null && token !== "";
  }
  clearUser() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("authToken");
  }

  //   async login(email: string, password: string) {
  //     try {
  //       const response = await axiosInstance.post("/api/auth/login", {
  //         email,
  //         password,
  //       });
  //       this.setUser(response.data);
  //       return true;
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //       return false;
  //     }
  //   }

  //   async register(userData: {
  //     firstName: string;
  //     lastName: string;
  //     email: string;
  //     telephone: string;
  //     password: string;
  //   }) {
  //     try {
  //       const response = await axiosInstance.post("/api/auth/register", userData);
  //       this.setUser(response.data);
  //       return true;
  //     } catch (error) {
  //       console.error("Registration failed:", error);
  //       return false;
  //     }
  //   }

  //   async logout() {
  //     try {
  //       await axiosInstance.post("/api/auth/logout");
  //       this.clearUser();
  //       return true;
  //     } catch (error) {
  //       console.error("Logout failed:", error);
  //       return false;
  //     }
  //   }
}

export const userStore = new UserStore();
