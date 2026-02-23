export interface SubmitPaymentLotDTO {
    mp_i_lot_id: number;
    amount: number;
    lot_number?: string;
}

export interface SubmitPaymentDTO {
    phone_number: string;
    mp_i_owner_id: number;
    mp_t_purchagr_id: number;
    reference_number: string;
    cnc_sales_incharge: string;
    attachment?: File | null;                                                                                                   
    lots: SubmitPaymentLotDTO[];
    description?: string;
    notes?: string;   
}
