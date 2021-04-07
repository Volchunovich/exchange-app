import { UserInDTO } from "./User.types";

export class UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  constructor(model: UserInDTO) {
    this.id = model.id;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.phoneNumber = model.phoneNumber;
  }
}