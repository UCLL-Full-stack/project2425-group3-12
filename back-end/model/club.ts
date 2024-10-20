import { Member } from "./member";
import { Organiser } from "./organiser";

export class Club {
    private id?: number;
    private name: string;
    private description: string;
    private type: string;
    private members: Member[];
    private organiser: Organiser;

    constructor(club: {id?: number; name: string; description: string; type: string; members: Member[]; organiser: Organiser}){
        this.id = club.id;
        this.name = club.name;
        this.description = club.description;
        this.type = club.type;
        this.members = club.members;
        this.organiser = club.organiser;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getType(): string {
        return this.type;
    }

    getMembers(): Member[] {
        return this.members;
    }

    addMemberToClub(member: Member): Member {
        this.members.push(member)
        return member;
    }

    getOrganiser(): Organiser {
        return this.organiser;
    }

    equals(club: Club): boolean {
        return (
            this.id === club.getId() &&
            this.name === club.getName() &&
            this.description === club.getDescription() &&
            this.type === club.getType() &&
            this.members === club.getMembers() &&
            this.organiser === club.getOrganiser()
        );
    }
}