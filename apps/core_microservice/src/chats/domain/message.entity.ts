import { v7 } from 'uuid';

export class Message {
  private constructor(
  public readonly id: string,
  public readonly chatId: string,
  public readonly profileId: string,
  private content: string,
  private isEdited: boolean,
  public readonly createdAt: Date,
  public readonly createdById: string,
  protected updatedAt: Date,
  protected updatedById: string,
  private deleted: boolean
  ) {}

  private update(callerId: string): void {
    this.updatedAt = new Date();
    this.updatedById = callerId;
  }

  static create(
    chatId: string,
    profileId: string,
    content: string,
  ): Message {
    return new Message(
      v7(), chatId, profileId, content, false,
      new Date(), profileId, new Date(), profileId,
      false
    );
  }

  delete(): void {
    this.deleted = true;
  }
}