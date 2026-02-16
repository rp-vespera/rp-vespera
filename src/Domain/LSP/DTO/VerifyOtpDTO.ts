// Send OTP
export interface SendOtpDTO {
  phone: string;
  name1: string;
  bpar: string;
  owner: string;
}

export interface SendOtpResponseDTO {
  success: boolean;
  type: string; // otp_sent
  message: string;
}

// Verify OTP
export interface CheckOtpDTO {
  name1: string;
  bpar: string;
  owner: string;
  otp: string;
  phone: string;
}
