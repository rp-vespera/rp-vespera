import { LocationDTO } from "../DTO/BuyerRegDTO";

export class LocationModel {
  constructor(
    public code: string,
    public name: string
  ) {}

  static fromDTO(dto: LocationDTO) {
    return new LocationModel(dto.code, dto.name);
  }
}

