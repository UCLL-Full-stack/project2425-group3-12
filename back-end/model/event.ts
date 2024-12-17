import { Club } from './club';
import { Member } from './member';
import {
    Club as ClubPrisma,
    Member as MemberPrisma,
    Event as EventPrisma,
    User as UserPrisma,
    Organiser as OrganiserPrisma
} from '@prisma/client'

export class Event {
    private id?: number;
    private title: string;
    private description: string;
    private location: string;
    private date: Date;
    private time: string;
    private participants: Member[];
    private club: Club;

    constructor(event: {id?: number; title: string; description: string; location: string; date: Date; time: string; participants: Member[]; club: Club;}){
        this.id = event.id;
        this.title = event.title;
        this.description = event.description;
        this.location = event.location;
        this.date = event.date;
        this.time = this.validateTime(event.time);
        this.participants = event.participants;
        this.club = event.club;
    }
    
    // Time validation method
    private validateTime(time: string): string {
        // Check for 24-hour format (HH:mm)
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        
        if (!timeRegex.test(time)) {
            throw new Error('Time must be in 24-hour format (HH:mm)');
        }
        return time;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getLocation(): string {
        return this.location;
    }

    getDate(): Date {
        return this.date;
    }

    getTime(): string {
        return this.time;
    }

    getParticipants(): Member[] {
        return this.participants;
    }

    addParticipantToEvent(participant: Member): Member {
        this.participants.push(participant);
        return participant;
    }

    getClub(): Club {
        return this.club;
    }

    // Method to check for duplicate events
    isDuplicateOf(other: Event): boolean {
        // Compare club, date, time and title
        const sameClub = this.club.getId() === other.getClub().getId();
        const sameDate = this.date.toDateString() === other.getDate().toDateString();
        const sameTime = this.time === other.getTime();
        const sameTitle = this.title === other.getTitle();

        return sameClub && sameDate && sameTime && sameTitle;
    }

    equals(event: Event): boolean {
        return (
            this.title === event.getTitle() &&
            this.description === event.getDescription() &&
            this.location === event.getLocation() &&
            this.date === event.getDate() &&
            this.time === event.getTime() &&
            this.participants === event.getParticipants() &&
            this.club === event.getClub()
        );
    }

    static from({
        id,
        title,
        description,
        location,
        date,
        time,
        participants,
        club
    }: EventPrisma & {
            participants: (MemberPrisma & { user: UserPrisma })[],
            club: ClubPrisma & {
            organiser: OrganiserPrisma & { user: UserPrisma },
            members: (MemberPrisma & { user: UserPrisma })[]
        }
        }) {
        return new Event({
            id,
            title,
            description,
            location,
            date,
            time,
            participants: participants.map(participant => Member.from(participant)),
            club: Club.from(club)
        });
    }
}