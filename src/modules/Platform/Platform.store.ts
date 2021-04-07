import { makeAutoObservable } from "mobx";
import { provide } from "../../utils/ioc.util";

@provide.singleton()
export class PlatformStore {
  private activeStep: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get getActiveStep(): Readonly<number> {
    return this.activeStep;
  }

  nextStep() {
    if (this.activeStep < 2) {
      this.activeStep += 1;
    }
  }

  prevStep() {
    if (this.activeStep > 0) {
      this.activeStep -= 1;
    }
  }
}