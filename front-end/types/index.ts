type Role = 'admin' | 'organiser' | 'member' | 'guest';
type ClubType = 'Chess' | 'Rugby' | 'DnD' | 'Soccer' | 'Tennis' | 'Capoeira' | 'Kizomba' ;

export type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
}

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
    id: number;
    title: string;
    description: string;
    location: string;
    date: Date;
    time: number;
    participants: Member[];
    club: Club;
}


export type StatusMessage = {
    message: string;
    type: "error" | "success";
};