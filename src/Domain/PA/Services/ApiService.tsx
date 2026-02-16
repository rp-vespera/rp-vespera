import { SendOtpDTO } from "../DTO/sendOtpDTO";
import { VerifyIdDTO } from "../DTO/VerifyIdDTO";
import { OtpVerificationModel } from "../Model/OtpVerificationModel";
import { SendOtpModel } from "../Model/sendOtpModel";
import { VerifyIdModel } from "../Model/VerifyIdModel";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // from .env
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

export class ApiService {
  private otpsend: string;
  private otpVerify: string;
  private verifyUrl: string;

  constructor() {
    if (!API_URL) {
      throw new Error("API URL is not defined in environment variables");
    }
    this.otpsend = `${API_URL}/sendOtp`;
    this.otpVerify = `${API_URL}/verifyOtp`;
    this.verifyUrl = `${API_URL}/verifyID`;
  }

  static generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtp(customer: SendOtpModel, module = "PA"): Promise<void> {
    if (!customer.mobile || !customer.firstName || !customer.lastName) {
      throw new Error("Please fill required fields");
    }

    const otp = ApiService.generateOtp(); // use class static method

    const dto: SendOtpDTO = {
      phone: customer.mobile,
      fname: customer.firstName,
      mname: customer.middleName || null,
      lname: customer.lastName,
      module,
      otp,
      message: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    const response = await fetch(this.otpsend, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }
  }

  async verifyOtp(
    customer: OtpVerificationModel,
    otp: string,
    module: string = "CustomerSupport",
  ): Promise<void> {
    if (!otp) throw new Error("OTP is required");
    if (!customer.mobile || !customer.firstName || !customer.lastName) {
      throw new Error("Customer details are incomplete");
    }

    const payload = {
      name1:
        `${customer.firstName} ${customer.middleName || ""} ${customer.lastName}`.trim(),
      phone: customer.mobile,
      module,
      otp,
    };

    const response = await fetch(this.otpVerify, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || "OTP verification failed");
  }

    async verifyId(model: VerifyIdModel): Promise<any> {
    if (!model.govId) throw new Error("Government ID is required");

    const dto: VerifyIdDTO = {
      gov_id: model.govId,
      fname: model.firstName,
      mname: model.middleName || "",
      lname: model.lastName,
      province: model.province,
      city: model.city,
      barangay: model.barangay,
    };

    const formData = new FormData();
    Object.entries(dto).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(this.verifyUrl, {
      method: "POST",
      body: formData, 
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Verification failed");
    }

    return data.data; 
  }
}
