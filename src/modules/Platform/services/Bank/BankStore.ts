// import { TransactionInDTO, TransactionOutDTO, TransactionStatus } from "../Transaction";

import { TransactionInDTO } from "../Transaction/TransactionInDTO";
import { TransactionOutDTO } from "../Transaction/TransactionOutDTO";
import { TransactionStatus } from "../Transaction/TransactionStatus";


export class BankStore {
  private static DATA_MOCK: TransactionInDTO = { 
    id: 0,
    code: 200, 
    status: TransactionStatus.Transfering, 
    details: {}
  }

  static async BankProccessImitation(payload: TransactionOutDTO): Promise<TransactionInDTO> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        resolve(BankStore.DATA_MOCK);
      }, 2000);
    });
  }
}