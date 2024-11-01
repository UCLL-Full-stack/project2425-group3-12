import { Club } from "../model/club";
import { Member } from "../model/member";

type Role = 'admin' | 'organiser' | 'member' | 'guest';
type ClubType = 'Chess' | 'Rugby' | 'DnD' | 'Soccer' | 'Tennis' | 'Capoeira' | 'Kizomba' ;

type ClubInput = {
    id?: number;
    name: string;
    description: string;
    type: ClubType;
    members: MemberInput[];
    organiser: OrganiserInput;
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
    date: Date;
    time: number;
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
