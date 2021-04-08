import { GenerateTransactionInDTO, GenerateTransactionOutDTO } from "../../../Dashboard/Transactions/Transaction.types";

export interface BankTransactionOutDTO {
  cardNumber: string;
  expiration: string;
  cvc: string;
  fullName: string;
  showCvc: boolean;  
}

export class BankStore {

  static async BankProccessImitation(payload: GenerateTransactionOutDTO): Promise<GenerateTransactionInDTO> {
    return new Promise((resolve) => { 
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        resolve({id: '1'});
      }, 2000);
    });
  } 
} 