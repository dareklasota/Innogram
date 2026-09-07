import { ChatMemberRole } from './enums/chat-member-role.enum.js';

export class ChatMember {
  private constructor (
    public readonly userId: string,
    public readonly profileId: string,
    private role: ChatMemberRole,
    public readonly joinedAt: Date = new Date()
  ) {}

  static create(
    userId: string, profileId: string, 
    role: ChatMemberRole = ChatMemberRole.MEMBER
  ): ChatMember {
    return new ChatMember(userId, profileId, role);
  }

  isAdmin(): boolean {
    return this.role === ChatMemberRole.ADMIN;
  }

  promoteToAdmin(): void {
    this.role = ChatMemberRole.ADMIN;
  }
}