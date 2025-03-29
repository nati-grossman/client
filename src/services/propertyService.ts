import { postData } from "./apiService";
import { AddPropertyModel } from "types/Property/AddPropertyModel";

export class PropertyService {
  addProperty = async (property: AddPropertyModel): Promise<boolean | null> => {
    const endpoint = `/Properties/add-property`;
    try {
      const response = await postData<boolean>(endpoint,property);
      return response;
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };
}
