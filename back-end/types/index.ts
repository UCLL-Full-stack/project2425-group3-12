type Role = 'admin' | 'organiser' | 'member' | 'guest';

type ClubInput = {
    id?: number;
    name: string;
    description: string;
    type: string;
    members: string[];
    organiser: OrganiserInput;
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
};

export { Role, ClubInput, OrganiserInput, UserInput };
