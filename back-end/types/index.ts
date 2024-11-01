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

export {
    Role,
    ClubType,
    ClubInput,
    MemberInput,
    OrganiserInput,
    UserInput
};
