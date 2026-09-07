import { BaseDomainException } from './base-domain.exception.js';

export class NotSufficientPermissionsException extends BaseDomainException {
  constructor (message: string) {
    super(message);
  }
}