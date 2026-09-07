import { BaseDomainException } from '../../../shared/exceptions/base-domain.exception.js';

export class MessageException extends BaseDomainException {
  constructor(message: string) {
    super(message);
  }
}