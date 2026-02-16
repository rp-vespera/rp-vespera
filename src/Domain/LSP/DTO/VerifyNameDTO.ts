export interface VerifyNameDTO {
  firstname: string;
  middlename?: string | null;
  lastname: string;
}

export interface VerifyNameResponseDTO {
  success: boolean;
  message?: string;
  data?: any;
}