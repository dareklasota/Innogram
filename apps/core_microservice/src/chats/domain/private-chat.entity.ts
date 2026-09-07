import { v7 } from 'uuid';
import { Chat } from './chat.entity.js';
import { ChatMember } from './chat-member.entity.js';
import { ChatMemberRole } from './enums/chat-member-role.enum.js';
import { Message } from './message.entity.js';
import { ChatType } from '../../shared/enums/chat-type.enum.js';

export class PrivateChat extends Chat {
  private constructor(
    id: string,
    name: string,
    description: string | null,
    members: ChatMember[],
    messages: Message[],
    createdAt: Date,
    createdById: string,
    updatedAt: Date,
    updatedById: string,
  ) {
    super(
      id, name, description, members, messages, 
      createdAt, createdById, updatedAt, updatedById
    );
  }

  static create(
    userAId: string,
    userBId: string,
    name: string,
    description: string | null,
  ): PrivateChat {
    if (userAId === userBId)
      throw new Error("Can't create a chat with yourself");

    const members: [ChatMember, ChatMember] = [
      ChatMember.create(userAId, ChatMemberRole.ADMIN),
      ChatMember.create(userBId, ChatMemberRole.ADMIN)
    ];

    return new PrivateChat(
      v7(), name, description, members, [], 
      new Date(), userAId, new Date(), userAId
    );
  }

  chatType(): ChatType {
    return ChatType.PRIVATE;
  }

  editName(caller: ChatMember, name: string): void {
    throw new Error();
  }
}