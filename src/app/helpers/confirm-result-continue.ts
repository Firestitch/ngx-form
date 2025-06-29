import { ConfirmResult } from '../enums/confirm-result';

export function confirmResultContinue(result): boolean {
  return (
    result === ConfirmResult.Discard || 
    result === ConfirmResult.Save || 
    result === ConfirmResult.Pristine
  );
}
