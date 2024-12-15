import { Member } from "./member";
import { Organiser } from "./organiser";
import { Event } from "./event";
import { ClubType } from "../types";

export class Club {
    private id?: number;
    private name: string;
    private description: string;
    private type: ClubType;
    private members: Member[];
    private organiser: Organiser;
    private events: Event[];

    constructor(club: {id?: number; name: string; description: string; type: ClubType; members: Member[]; organiser: Organiser; events: Event[];}){
        this.id = club.id;
        this.name = club.name;
        this.description = club.description;
        this.type = club.type;
        this.members = club.members;
        this.organiser = club.organiser;
        this.events = club.events;
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

    getType(): ClubType {
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

    getEvents(): Event[] {
        return this.events;
    }

    validate(club: {
        name: string;
        description: string;
        type: ClubType;
        members: Member[];
        organiser: Organiser;
        events: Event[];
    }) {
        if (!club.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!club.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!club.type) {
            throw new Error('Type is required');
        }
        if (!club.members) {
            throw new Error('Members are required');
        }
        if (!club.organiser) {
            throw new Error('Organiser is required');
        }
        if (!club.events) {
            throw new Error('Events are required');
        }
    }

    equals(club: Club): boolean {
        return (
            this.id === club.getId() &&
            this.name === club.getName() &&
            this.description === club.getDescription() &&
            this.type === club.getType() &&
            this.members === club.getMembers() &&
            this.organiser === club.getOrganiser() &&
            this.events === club.getEvents()
        );
    }
}