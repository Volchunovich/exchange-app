import { makeAutoObservable, runInAction } from 'mobx';
import { lazyInject, provide } from '../../../utils/ioc.util';

import { TransactionModel } from './Transaction.model';
import { GenerateTransactionOutDTO, GenerateTransactionInDTO, GetTransactionOutDTO, GetTransactionInDTO } from './Transaction.types';
import { HttpClientV1 } from '../../../utils/api/HttpClientV1';

@provide.singleton() 
export class TransactionStore {

  @lazyInject(HttpClientV1)
  private readonly api!: HttpClientV1;

  transaction: TransactionModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  
  async fetchTransaction(payload: GetTransactionOutDTO) {
    try {
      const transaction = await this.api.get<GetTransactionInDTO>('/user/transaction');

      runInAction(() => {
        this.transaction = new TransactionModel(payload.transactionId, transaction);
      })
    } catch (e) {
      throw new Error(e.message);
    }
    
  }

  async generateTransaction(payload: GenerateTransactionOutDTO): Promise<GenerateTransactionInDTO> {
    try {
      return await this.api.post<GenerateTransactionOutDTO, GenerateTransactionInDTO>('/user/transaction', payload);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}