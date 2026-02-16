export interface VerifyIdModel {
  firstName: string;
  middleName?: string;
  lastName: string;
  province: string; // code
  city: string;     // code
  barangay: string; // code
  govId: File | null;

  // Optional after verification
  province_name?: string;
  city_name?: string;
  barangay_name?: string;
  base64?: string;   // image base64 returned
  valid_id?: boolean;
  id_type?: string;
}