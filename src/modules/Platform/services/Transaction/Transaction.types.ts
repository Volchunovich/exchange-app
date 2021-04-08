export enum TransactionStatus {
  Pending = 'pending',
  Transfering = 'transfering',
  Declined = 'declined',
  Completed = 'completed'
}

export interface TransactionInDTO {
  id: number;
  code: number;
  status: TransactionStatus;
  details: Object;
}

export interface TransactionOutDTO {
  cardNumber: string;
  expiration: string;
  cvc: string;
  fullName: string;
  showCvc: boolean; 
}