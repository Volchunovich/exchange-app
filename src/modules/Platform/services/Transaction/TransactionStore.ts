import { makeAutoObservable, runInAction } from 'mobx';
import { provide } from '../../../../utils/ioc.util';
import { BankStore } from '../Bank/BankStore';
import { TransactionInDTO } from "./TransactionInDTO";
import { TransactionModel } from "./TransactionModel";
import { TransactionOutDTO } from "./TransactionOutDTO";

@provide.singleton()
export class TransactionStore {
  
  transaction: TransactionModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  
  async fetchTransaction(payload: TransactionOutDTO) {
    const transactionDto: TransactionInDTO = await BankStore.BankProccessImitation(payload);
    runInAction(() => {
      this.transaction = new TransactionModel(transactionDto);
    })
  }
}