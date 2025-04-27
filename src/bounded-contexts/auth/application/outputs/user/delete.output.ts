
import { BaseOutput } from '../i-output-base.dto';

export class DeleteOutput extends BaseOutput {


  /**
   * アカウントが存在しない場合
   */
  readonly isErrorNotFound: boolean;

  constructor(args: {
    isSuccess: boolean;
    isErrorNotFound?: boolean;
  }) {
    super(args.isSuccess);
    this.isErrorNotFound = args.isErrorNotFound ?? false;
  }
}
