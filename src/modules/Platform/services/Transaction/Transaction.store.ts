import { makeAutoObservable, runInAction } from 'mobx';
import { provide } from '../../../../utils/ioc.util';
import { BankStore } from '../Bank/BankStore';

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