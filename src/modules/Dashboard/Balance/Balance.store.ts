import { lazyInject, provide } from "../../../utils/ioc.util";
import { HttpClientV1 } from '../../../utils/api/HttpClientV1';
import { AuthStore } from '../../Auth/Auth.store';
import { InBalanceDTO } from './Balance.types';
import { BalanceModel } from "./Balance.model";
import { makeAutoObservable, runInAction } from 'mobx';

@provide.singleton()
export class BalanceStore {
  @lazyInject(AuthStore)
  private readonly authStore!: AuthStore;

  @lazyInject(HttpClientV1)
  private readonly api!: HttpClientV1;

  balances: BalanceModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBalances() {
    try {
      const options = {
        headers: {
          'authorization': `Bearer ${this.authStore.accessToken}`
        }
      }
  
      const balances = await this.api.get<InBalanceDTO[]>('user/balance', options);
      runInAction(() => {
        this.balances = balances.map(balance => new BalanceModel(balance)); 
      })
    } catch (e) {
      throw new Error(e.message);
    }
  }
}