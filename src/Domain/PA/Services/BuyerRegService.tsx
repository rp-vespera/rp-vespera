import { LocationDTO } from "../DTO/BuyerRegDTO";
import { LocationModel } from "../Model/BuyerRegModel";

const BASE_URL = "https://psgc.gitlab.io/api";

export class LocationService {
  static async getProvinces(): Promise<LocationModel[]> {
    const res = await fetch(`${BASE_URL}/provinces/`);
    const data: LocationDTO[] = await res.json();
    return data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(LocationModel.fromDTO);
  }

  static async getCities(provinceCode: string): Promise<LocationModel[]> {
    const res = await fetch(`${BASE_URL}/provinces/${provinceCode}/cities-municipalities/`);
    const data: LocationDTO[] = await res.json();
    return data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(LocationModel.fromDTO);
  }

  static async getBarangays(cityCode: string): Promise<LocationModel[]> {
    const res = await fetch(`${BASE_URL}/cities-municipalities/${cityCode}/barangays/`);
    const data: LocationDTO[] = await res.json();
    return data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(LocationModel.fromDTO);
  }
}
