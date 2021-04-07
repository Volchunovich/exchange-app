import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable } from 'inversify';

@injectable()
export abstract class HttpClient {
  protected abstract readonly BASE_PATH: string;

  protected _client?: AxiosInstance;
  protected get client(): AxiosInstance {
    return this._client
      ? this._client
      : this._client = axios.create({
        baseURL: `${window.location.origin + this.BASE_PATH}`,
      });
  }

  get accessToken(): string | undefined {
    // return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || undefined;
    return '';
  }

  protected constructor() {
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  protected onSuccess(response: AxiosResponse) {
    const { url, baseURL } = response.config;
    const path = `${this.BASE_PATH}${(url || '').slice((baseURL || '').length)}`;

    console.debug(`Request Successful! (${path})`, response);
    return response.data;
  }

  protected onError(error: AxiosError): Promise<AxiosResponse | string>  {
    const { url, baseURL } = error.config;
    const path = `${this.BASE_PATH}${(url || '').slice((baseURL || '').length)}`;

    console.error(`Request Failed (${path}):`, error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:',  error.response.status);
      console.error('Data:',    error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }

  async request(options: AxiosRequestConfig) {
    return this.client({
      ...options,
      headers: {
        ...(this.accessToken ? { authorization: `Bearer ${this.accessToken}` } : {}),
        ...(options.headers || {})
      }
    }).then(this.onSuccess).catch(this.onError);
  }

  public async get<ResponseType = any>(path: string, options?: AxiosRequestConfig): Promise<ResponseType> {
    return this.request({ method: 'GET', url: path, ...options });
  }

  public async post<PayloadType = any, ResponseType = any>(path: string, payload?: PayloadType, options?: AxiosRequestConfig):
    Promise<ResponseType>
  {
    return this.request({ method: 'POST', url: path, data: payload, ...options });
  }

  public async put<PayloadType = any, ResponseType = any>(path: string, payload?: PayloadType, options?: AxiosRequestConfig):
    Promise<ResponseType>
  {
    return this.request({ method: 'PUT', url: path, data: payload, ...options });
  }

  public async delete<ResponseType = any, PayloadType = any>(path: string, payload?: PayloadType, options?: AxiosRequestConfig):
    Promise<ResponseType>
  {
    return this.request({ method: 'DELETE', url: path, data: payload, ...options });
  }
}
