import { LocationDTO } from "../DTO/BuyerRegDTO";
import { LocationModel } from "../Model/BuyerRegModel";

const BASE_URL = "https://psgc.gitlab.io/api";

export class LocationService {

  private static provincesCache: LocationModel[] | null = null;
  private static citiesCache: Record<string, LocationModel[]> = {};
  private static barangaysCache: Record<string, LocationModel[]> = {};


  static async getProvinces(): Promise<LocationModel[]> {
    if (this.provincesCache) return this.provincesCache;

    const res = await fetch(`${BASE_URL}/provinces/`);
    const data: LocationDTO[] = await res.json();
    const models = data.sort((a, b) => a.name.localeCompare(b.name)).map(LocationModel.fromDTO);

    this.provincesCache = models; // save to cache
    return models;
  }

  static async getCities(provinceCode: string): Promise<LocationModel[]> {
    if (this.citiesCache[provinceCode]) return this.citiesCache[provinceCode];

    const res = await fetch(`${BASE_URL}/provinces/${provinceCode}/cities-municipalities/`);
    const data: LocationDTO[] = await res.json();
    const models = data.sort((a, b) => a.name.localeCompare(b.name)).map(LocationModel.fromDTO);

    this.citiesCache[provinceCode] = models; // save to cache
    return models;
  }

  static async getBarangays(cityCode: string): Promise<LocationModel[]> {
    if (this.barangaysCache[cityCode]) return this.barangaysCache[cityCode];

    const res = await fetch(`${BASE_URL}/cities-municipalities/${cityCode}/barangays/`);
    const data: LocationDTO[] = await res.json();
    const models = data.sort((a, b) => a.name.localeCompare(b.name)).map(LocationModel.fromDTO);

    this.barangaysCache[cityCode] = models; // save to cache
    return models;
  }

  static clearCache() {
    this.provincesCache = null;
    this.citiesCache = {};
    this.barangaysCache = {};
  }
}
