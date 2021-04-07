import { lazyInject, provide } from "../../../utils/ioc.util";
import { AuthStore } from '../../Auth/AuthStore';
import { makeAutoObservable } from 'mobx';
import { UserModel } from './User.model';
import { UserInDTO } from "./User.types";
import { HttpClientV1 } from '../../../utils/api/HttpClientV1';

@provide.singleton()
export class UserStore {

  @lazyInject(AuthStore)
  private readonly authStore!: AuthStore;

  @lazyInject(HttpClientV1)
  private readonly api!: HttpClientV1;

  userModel!: UserModel;

  constructor() {
    makeAutoObservable(this);
  }

  async getUser(): Promise<UserModel> {
    const options = {
      headers: {
        'authorization': `Bearer ${this.authStore.accessToken}`
      }
    }
    const user = await this.api.get<UserInDTO>('/user', options);
    this.userModel = new UserModel(user);
    return this.userModel;
  }
}