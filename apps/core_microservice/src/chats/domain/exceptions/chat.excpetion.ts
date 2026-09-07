import { BaseDomainException } from '../../../shared/exceptions/base-domain.exception.js';

export class ChatException extends BaseDomainException {
  constructor(message: string) {
    super(message);
  }
}