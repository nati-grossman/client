import { postData, getData } from "./apiService";
import { AddPropertyModel } from "types/Property/AddPropertyModel";
import {
  CityStreetAddressDto,
  CityStreetAddressResponse,
} from "types/Property/CityStreetAddressDto";

export class PropertyService {
  addProperty = async (property: AddPropertyModel): Promise<boolean | null> => {
    const endpoint = `/Properties/add-property`;
    try {
      const response = await postData<boolean>(endpoint, property);
      return response;
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };

  getAddressDetails = async (
    val: string
  ): Promise<CityStreetAddressDto[] | null> => {
    const endpoint = `/Properties/address-details?&val=${encodeURIComponent(
      val
    )}`;
    try {
      const response = await getData<CityStreetAddressResponse>(endpoint);
      return response?.data || [];
    } catch (error: unknown) {
      console.error("Error fetching address details:", error);
      return null;
    }
  };
}
