import { VerifyNameDTO, VerifyNameResponseDTO } from "../DTO/VerifyNameDTO";
import { SendOtpDTO, SendOtpResponseDTO, CheckOtpDTO,} from "../DTO/VerifyOtpDTO";
import { GetOwnerLotResponseDTO } from "../DTO/GetOwnerLotDTO";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const PaymentService = {
    async verifyName(
        payload: VerifyNameDTO
    ): Promise<VerifyNameResponseDTO> {
        const response = await fetch(`${BASE_URL}/verifyName`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

        if (!response.ok) {
        throw new Error("Verification failed");
        }

        return response.json();
    },
    async sendOtp(payload: SendOtpDTO): Promise<SendOtpResponseDTO> {
        const response = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        if (!response.ok) {
        throw new Error("Failed to send OTP");
        }

        return response.json();
    },

    async checkOtp(payload: CheckOtpDTO) {
        const response = await fetch(`${BASE_URL}/checkOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        if (!response.ok) {
        throw new Error("OTP verification failed");
        }

        return response.json();
    },
    async getOwnerLots(bparId: string): Promise<GetOwnerLotResponseDTO> {
        const response = await fetch(`${BASE_URL}/checkLots/${bparId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch lots");
        }

        return response.json();
    }
};
