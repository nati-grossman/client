import { postData } from "./apiService";
import { LoginResponse } from "types/Login/LoginResponse";
import { LoginRequest } from "types/Login/LoginRequest";
import { RegisterRequest } from "types/Registration/RegisterRequest";
import { RegisterResponse } from "types/Registration/RegisterResponse";

export class UserService {
    login = async (data : LoginRequest) => {
        const endpoint = "/api/user/login";
        try {
          const response = await postData<LoginResponse>(endpoint, data);
          return response;
        } catch (error: unknown) {
          console.error("Error:", error);
        }
    }
    register = async (data : RegisterRequest) => {
        const endpoint = "/api/user/registration";
        try {
        const response = await postData<RegisterResponse>(endpoint, data);
        return response;
        } catch (error: unknown) {
        console.error("Error:", error);
        }
    }
}