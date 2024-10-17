import { User } from './user';
import { Member } from './member';

export class Event {
    private id?: number;
    private title: string;
    private description: string;
    private location: string;
    private date: Date;
    private time: number;
    private particapants: User[];

    constructor(event: {id?: number; title: string; description: string; location: string; date: Date; time: number; participants: User[];}){
        this.id = event.id;
        this.title = event.title;
        this.description = event.description;
        this.location = event.location;
        this.date = event.date;
        this.time = event.time;
        this.particapants = event.participants;
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

    getParticipants(): User[] {
        return this.particapants;
    }
}