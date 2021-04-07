import { makeAutoObservable } from 'mobx';
import { TransactionInDTO } from './TransactionInDTO';
import { TransactionStatus } from './TransactionStatus';

export class TransactionModel {
  id: number;
  code: number;
  status: TransactionStatus;
  details: Object;

  constructor(model: TransactionInDTO) {
    makeAutoObservable(this);

    this.id = model.id;
    this.code = model.code;
    this.status = model.status;
    this.details = model.details;
  }
}