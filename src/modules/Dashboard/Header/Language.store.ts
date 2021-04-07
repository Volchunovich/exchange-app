import { makeAutoObservable } from 'mobx';
import { provide } from '../../../utils/ioc.util';

export type LanguageType = 'ru' | 'en';

@provide.singleton()
export class LanguageStore {
  currentLanguage: LanguageType = 'en';

  constructor() {
    makeAutoObservable(this);
  }
}