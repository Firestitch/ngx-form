import { InjectionToken } from '@angular/core';
import { ERROR_MESSAGES } from '../consts/error-messages.const';

export const VALIDATE_MESSAGES = new InjectionToken<Record<string, string>>(
  'fs.form.validate-messages',
);

export const VALIDATE_MESSAGE_PROVIDER = {
  provide: VALIDATE_MESSAGES,
  useFactory: messageProviderFactory,
};

export function messageProviderFactory() {
  return { ...ERROR_MESSAGES };
}

