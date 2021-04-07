import { provide } from '../ioc.util';
import { HttpClient } from './abstract/HttpClient';

@provide.singleton()
export class HttpClientV1 extends HttpClient {
  protected readonly BASE_PATH: string = '/api/v1';
}
