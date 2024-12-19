type Role = 'admin' | 'organiser' | 'member' | 'guest';
type ClubType = 'Chess' | 'Rugby' | 'DnD' | 'Soccer' | 'Tennis' ;

export type User = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

export type Member = {
    id: number;
    user: User;
}

export type Organiser = {
    id: number;
    user: User;
}

export type Club = {
    id: number;
    name: string;
    description: string;
    type: ClubType;
    members: Member[];
    organiser: Organiser;
    events: Event[];
}

export type Event = {
    id?: number;
    title: string;
    description: string;
    location: string;
    date: Date;
    time: number;
    participants: Member[];
    // club: Response;
    club: Club;
}


export type StatusMessage = {
    message: string;
    type: "error" | "success";
};