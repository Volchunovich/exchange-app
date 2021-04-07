import { lazyInject, provide } from "../../../utils/ioc.util";
import { HttpClientV1 } from '../../../utils/api/HttpClientV1';

@provide.singleton()
export class BalanceStore {

  @lazyInject(HttpClientV1)
  private readonly api!: HttpClientV1;

  async balances() {
    await this.api.get('')
  }
}