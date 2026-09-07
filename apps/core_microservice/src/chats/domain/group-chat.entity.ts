import { v7 } from 'uuid';
import { ChatType } from '../../shared/enums/chat-type.enum.js';
import { NotSufficientPermissionsException } from '../../shared/exceptions/not-sufficient-permissions.exception.js';
import { ChatMember } from './chat-member.entity.js';
import { Chat } from './chat.entity.js';
import { ChatMemberRole } from './enums/chat-member-role.enum.js';
import { ChatException } from './exceptions/chat.excpetion.js';
import { Message } from './message.entity.js';

export class GroupChat extends Chat {
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
    creatorId: string,
    name: string,
    description: string | null,
    memebrsIds: string[]
  ): GroupChat {
    const creator = ChatMember.create(creatorId, ChatMemberRole.ADMIN);

    const memberIdsWithNoCreator = new Set(
      [...memebrsIds].filter(id => id !== creatorId)
    );

    const chatMembers = [...memberIdsWithNoCreator]
      .map(id => ChatMember.create(id, ChatMemberRole.MEMBER));

    return new GroupChat(
      v7(), name, description, [creator, ...chatMembers], [], 
      new Date(), creatorId, new Date(), creatorId
    );
  }

  chatType(): ChatType {
    return ChatType.GROUP;
  }

  editName(caller: ChatMember, name: string): void {
    if (!caller.isAdmin())
      throw new NotSufficientPermissionsException('Not a chat admin');

    if (name.length === 0)
      throw new ChatException('Message is empty');

    if (name.length > 1000) 
      throw new ChatException('Message is too long');

    this.name = name;
    this.update(caller);
  }

  addMember(caller: ChatMember, member: ChatMember): void {
    if (!caller.isAdmin())
      throw new NotSufficientPermissionsException('Not a chat admin');

    this.members.push(member);
    this.update(caller);
  }

  removeMember(caller: ChatMember, target: ChatMember): void {
    const isSelfRemoval = caller.userId === target.userId;
    if (!isSelfRemoval && !caller.isAdmin())
      throw new Error();

    const remainingAdmins = this.members
      .filter(m => m.isAdmin() && m.userId !== target.userId);
    if (target.isAdmin() && remainingAdmins.length === 0)
      throw new Error();
    
    this.members = this.members
      .filter(m => m.userId !== target.userId);
    this.update(caller);
  }
}