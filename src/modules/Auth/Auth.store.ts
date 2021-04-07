import { action, makeAutoObservable } from "mobx";
import { lazyInject, provide } from "../../utils/ioc.util";
import { OutLoginDTO, OutRegisterDTO, InLoginDTO, OutAccessTokenDTO, InAccessTokenDTO } from './Auth.types';
import { HttpClientV1 } from '../../utils/api/HttpClientV1';

@provide.singleton()
export class AuthStore {
  @lazyInject(HttpClientV1)
  private readonly api!: HttpClientV1;

  accessToken: string = window.localStorage.getItem('accessToken') || '';
  refreshToken: string = window.localStorage.getItem('refreshToken') || '';

  isLoginIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(payload: OutLoginDTO) {
    try {
      const { accessToken, refreshToken } = await this.api.post<OutLoginDTO, InLoginDTO>('/auth/login', payload);

      this.accessToken = accessToken;
      this.refreshToken = refreshToken;

      this.setLocalStorageTokens(accessToken, refreshToken);
    } catch (e) {
      throw new Error(e.message);
    }

    console.log({access: this.accessToken, refresh: this.refreshToken});
  }

  async logout() {
    try {
      const options = {
        headers: {
          'authorization': `Bearer ${this.accessToken}`
        }
      }
      await this.api.post('/auth/logout', {}, options);

      this.resetLocalStorageTokens();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async register(payload: OutRegisterDTO) {
    await this.api.post('/auth/register', payload);
  }

  async getAccessToken() {
    try {
      const payload: OutAccessTokenDTO = {
        refreshToken: this.refreshToken
      }
      const { accessToken } = await this.api.post<OutAccessTokenDTO, InAccessTokenDTO>('/auth/get_access_token', payload);
      this.accessToken = accessToken;
      this.setLocalStorageTokens(accessToken, this.refreshToken);
    } catch (e) { 
      this.resetLocalStorageTokens();
    }
    
  }

  setLocalStorageTokens(access: string, refresh: string) {
    window.localStorage.setItem('accessToken', access);
    window.localStorage.setItem('refreshToken', refresh);
  }

  @action
  resetLocalStorageTokens() {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');

    this.accessToken = '';
    this.refreshToken = '';
  }

  get canAccessDashboard() {
    return !!this.accessToken && !!this.refreshToken;
  }

  get canAccessAuth() {
    return !this.canAccessDashboard;
  }

  reset() {
    this.isLoginIn = false;
  }
}