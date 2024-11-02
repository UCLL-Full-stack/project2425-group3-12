import { User } from "./user";

export class Organiser {
    private id?: number;
    private user: User;

    constructor(organiser: {id?: number; user: User}) {
        this.id = organiser.id;
        this.user = organiser.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    // TODO
    createEvent(): Event {
        throw new Error("Method not implemented.");
    }
    // TODO
    deleteEvent(): Event {
        throw new Error("Method not implemented.");
    }
    // TODO
    confirmSignup(): boolean {
        throw new Error("Method not implemented.");
    }

    equals(organiser: Organiser): boolean {
        return (
            this.id === organiser.getId() &&
            this.user.equals(organiser.getUser())
        );
    }
}