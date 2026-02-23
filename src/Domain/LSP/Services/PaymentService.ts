import { VerifyNameDTO, VerifyNameResponseDTO } from "../DTO/VerifyNameDTO";
import { SendOtpDTO, SendOtpResponseDTO, CheckOtpDTO } from "../DTO/VerifyOtpDTO";
import { GetOwnerLotResponseDTO } from "../DTO/GetOwnerLotDTO";
import { SubmitPaymentDTO } from "../DTO/SubmitPaymentDTO";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
function buildPaymentFormData(dto: SubmitPaymentDTO): FormData {
    const formData = new FormData();
    formData.append("phone_number", dto.phone_number);
    formData.append("mp_i_owner_id", dto.mp_i_owner_id.toString());
    formData.append("mp_t_purchagr_id", dto.mp_t_purchagr_id.toString());
    formData.append("reference_number", dto.reference_number);
    formData.append("cnc_sales_incharge", dto.cnc_sales_incharge);
    if (dto.attachment) {
        formData.append("attachment", dto.attachment);
    }
    if (dto.description) {
        formData.append("description", dto.description);
    }
    if (dto.notes !== undefined) {
        formData.append("notes", dto.notes);
    }
    formData.append("lots", JSON.stringify(dto.lots));
    return formData;
}

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
    async sendOtp(
        payload: SendOtpDTO
    ): Promise<SendOtpResponseDTO> {

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
    async getOwnerLots(
        bparId: string
    ): Promise<GetOwnerLotResponseDTO> {

        const response = await fetch(`${BASE_URL}/checkLots/${bparId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch lots");
        }

        return response.json();
    },
    async submitPayment(
        dto: SubmitPaymentDTO,
        merged: boolean = false
    ): Promise<{ success: boolean; message?: string }> {

        const endpoint = merged
            ? "/payment/merge"
            : "/payment/submit";

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            body: buildPaymentFormData(dto),
        });

        if (!response.ok) {
            throw new Error("Payment submission failed");
        }

        return response.json();
    },
};