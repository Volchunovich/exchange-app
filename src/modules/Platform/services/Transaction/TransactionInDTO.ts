import { TransactionStatus } from "./TransactionStatus";

export interface TransactionInDTO {
  id: number;
  code: number;
  status: TransactionStatus;
  details: Object;
}