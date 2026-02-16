export interface SendOtpDTO {
  phone: string;
  fname: string;
  mname?: string | null;
  lname: string;
  module: string;
  otp: string;
  message: string;
}