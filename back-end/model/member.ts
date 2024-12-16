import { User } from './user';

export class Member {
    private id?: number;
    private user: User;

    constructor(member: {id?: number; user: User}) {
        this.id = member.id;
        this.user = member.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    equals(member: Member): boolean {
        return (
            this.id === member.getId() &&
            this.user.equals(member.getUser())
        );
    }

    static from(participant: { id: number; userId: number; createdAt: Date; updatedAt: Date; eventId: number | null; } & { user: { id: number; username: string; firstName: string; lastName: string; email: string; password: string; role: string; createdAt: Date; updatedAt: Date; }; }): any {
        throw new Error('Method not implemented.');
    }
}
