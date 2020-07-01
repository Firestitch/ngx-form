import { ConfirmResult } from '../enums/confirm-result';

export function confirmResultContinue(result) {
  return result === ConfirmResult.Discard || result === ConfirmResult.Save || result === ConfirmResult.Pristine;
}
