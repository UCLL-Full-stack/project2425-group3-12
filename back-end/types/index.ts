import { Club } from "../model/club";
import { Member } from "../model/member";

type Role = 'admin' | 'organiser' | 'member' | 'guest';
type ClubType = 'Chess' | 'Rugby' | 'DnD' | 'Soccer' | 'Tennis' ;

type ClubInput = {
    id?: number;
    name: string;
    description: string;
    type: ClubType;
    members: Member[];
    organiser: OrganiserInput;
    events: EventInput[];
};

type MemberInput = {
    id?: number;
    user: UserInput;
};

type OrganiserInput = {
    id?: number;
    user: UserInput;
};

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
};

type EventInput = {
    id?: number;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    participants: Member[];
    club: ClubInput;
}

export {
    Role,
    ClubType,
    ClubInput,
    MemberInput,
    OrganiserInput,
    UserInput,
    EventInput
};
