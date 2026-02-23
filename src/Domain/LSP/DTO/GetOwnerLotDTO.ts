export interface LotItemDTO {
  bpar_i_person_id: number;
  mp_i_owner_id: number;
  mp_i_lot_id: number;
  amt_amort: string;
  amt_spotcash: string;
  mp_t_purchagr_id: number;
  lot: string;
  date_sched_payment: string;
}

export interface GetOwnerLotResponseDTO {
  success: boolean;
  data: LotItemDTO[];
}
