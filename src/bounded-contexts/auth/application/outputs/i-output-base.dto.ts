export abstract class BaseOutput {
  isSuccess: boolean;

  constructor(isSuccess: boolean) {
    this.isSuccess = isSuccess;
  }
}
