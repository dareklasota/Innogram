import { ChatType } from '../../shared/enums/chat-type.enum.js';
import { NotSufficientPermissionsException } from '../../shared/exceptions/not-sufficient-permissions.exception.js';
import { ChatMember } from './chat-member.entity.js';
import { Message } from './message.entity.js';

export abstract class Chat {
  protected constructor(
    public readonly id: string,
    protected name: string,
    protected description: string | null,
    protected members: ChatMember[],
    protected messages: Message[],
    public readonly createdAt: Date,
    public readonly createdById: string,
    protected updatedAt: Date,
    protected updatedById: string,
  ) {}

  abstract chatType(): ChatType;

  abstract editName(caller: ChatMember, name: string): void;

  getMembers(): ChatMember[] {
    return [...this.members];
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  protected update(caller: ChatMember): void {
    this.updatedAt = new Date();
    this.updatedById = caller.userId;
  }

  protected isMember(caller: ChatMember): boolean {
    return this.members
      .some(m => m.userId === caller.userId);
  }

  sendMessage(caller: ChatMember, message: Message): void {
    if (!this.isMember(caller))
      throw new NotSufficientPermissionsException('Not a chat member');
    this.messages.push(message);
    this.update(caller);
  }

  deleteMessage(caller: ChatMember, messageId: string): void {
    if (!this.isMember(caller))
      throw new NotSufficientPermissionsException('Not a chat member');

    const message = this.messages.find(m => m.id === messageId);
    if (message === undefined)
      throw new Error('Message not found');

    if (caller.userId !== message.profileId)
      throw new NotSufficientPermissionsException('Not the message owner');

    message.delete();
    this.update(caller);
  }

  editDescription(caller: ChatMember, description: string): void {
    if (!caller.isAdmin())
      throw new NotSufficientPermissionsException('Not a chat admin');

    this.description = description;
    this.update(caller);
  }
}