import { Club } from './club';
import { Member } from './member';

export class Event {
    private id?: number;
    private title: string;
    private description: string;
    private location: string;
    private date: Date;
    private time: number;
    private particapants: Member[];
    private club: Club;

    constructor(event: {id?: number; title: string; description: string; location: string; date: Date; time: number; participants: []; club: Club;}){
        this.id = event.id;
        this.title = event.title;
        this.description = event.description;
        this.location = event.location;
        this.date = event.date;
        this.time = event.time;
        this.particapants = event.participants;
        this.club = event.club;
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

    getTime(): number {
        return this.time;
    }

    getParticipants(): Member[] {
        return this.particapants;
    }

    addParticipantToEvent(participant: Member): Member {
        this.particapants.push(participant);
        return participant;
    }

    getClub(): Club {
        return this.club;
    }

    equals(event: Event): boolean {
        return (
            this.title === event.getTitle() &&
            this.description === event.getDescription() &&
            this.location === event.getLocation() &&
            this.date === event.getDate() &&
            this.time === event.getTime() &&
            this.particapants === event.getParticipants() &&
            this.club === event.getClub()
        );
    }
}