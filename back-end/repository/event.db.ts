import { Event } from '../model/event';
import { User } from "../model/user";
import { Member } from "../model/member";
import { Organiser } from "../model/organiser";
import { Club } from "../model/club";

import database from "./database";

// create 2 organisers
const organiserJohnDoe = new Organiser({
    id: 1,
    user: new User({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mail.com",
        password: "password",
        role: "organiser"
    })
})
const organiserJaneDoe = new Organiser({
    id: 2,
    user: new User({
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@mail.com",
        password: "password",
        role: "organiser"
    })
})

// create 4 members
const memberAlice = new Member({
    id: 1,
    user: new User({
        id: 5,
        firstName: "Alice",
        lastName: "Doe",
        email: "alice.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberBob = new Member({
    id: 2,
    user: new User({
        id: 6,
        firstName: "Bob",
        lastName: "Doe",
        email: "bob.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberCharlie = new Member({
    id: 3,
    user: new User({
        id: 7,
        firstName: "Charlie",
        lastName: "Doe",
        email: "charlie.doe@mail.com",
        password: "password",
        role: "member"
    })
})
const memberDavid = new Member({
    id: 4,
    user: new User({
        id: 8,
        firstName: "David",
        lastName: "Doe",
        email: "david.doe@mail.com",
        password: "password",
        role: "member"
    })
})

// create 2 clubs
const club1 = new Club({
    id: 1,
    name: "Checkmate Connoisseurs",
    description: "A chess club for strategy lovers, fostering intense matches and friendly competition among enthusiasts.",
    type: "Chess",
    members: [memberAlice, memberBob],
    organiser: organiserJohnDoe,
    events: []
})
const club2 = new Club({
    id: 2,
    name: "Hawaii Try-O",
    description: "An adventurous rugby club embracing teamwork, skill, and the spirit of aloha in every game.",
    type: "Rugby",
    members: [memberCharlie, memberDavid],
    organiser: organiserJaneDoe,
    events: []
})

const events: Event[] = [
    new Event({
        id: 1,
        title: "Annual Chess Tournament",
        description: "A competitive chess tournament with prizes for the top three participants.",
        location: "Community Hall",
        date: new Date('2024-12-05'),
        time: "10:00",
        participants: [memberAlice],
        club: club1
    }),
    new Event({
        id: 2,
        title: "Annual Rugby Championship",
        description: "A competitive rugby match bringing together local teams for the championship title.",
        location: "City Stadium",
        date: new Date('2024-11-07'),
        time: "14:00",
        participants: [memberCharlie, memberDavid],
        club: club2
    })
];


// al geupdate met story 20
const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventPrisma = await database.event.findMany({
            include: {
                club: {
                    include: {
                        organiser: {
                            include: {
                                user: true,
                            },
                        },
                        members: {
                            include: {
                                user: true, 
                            },
                        },
                    },
                },
                participants: {
                    include: {
                        user: true, 
                    },
                },
            },
        });
        return eventPrisma.map((eventPrisma) => Event.from(eventPrisma));
    } catch (error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

// al geupdate met story 20
const getEventById = async ({ id }: { id: number }): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findUnique({
            where: { id },
            include: {
                club: {
                    include: {
                        organiser: {
                            include: {
                                user: true,
                            },
                        },
                        members: {
                            include: {
                                user: true, 
                            },
                        },
                    },
                },
                participants: {
                    include: {
                        user: true, 
                    },
                },
            },},
        );

        return eventPrisma ? Event.from(eventPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createNewEvent = async (eventInfo: Event): Promise<Event> => {  
    try {
        const eventPrisma = await database.event.create({
            data: {
                title: eventInfo.getTitle(),
                description: eventInfo.getDescription(),
                location: eventInfo.getLocation(),
                date: eventInfo.getDate(),
                time: eventInfo.getTime(),
                participants: {
                    create: eventInfo.getParticipants().map((participant) => ({
                        user: {
                            connect: { id: participant.getUser().getId() },
                        },
                    })),
                },
                club: {
                connect: { id: eventInfo.getClub().getId() }, 
                },
            },
            include: {
                club: {
                    include: {
                        organiser: { include: { user: true } },
                        members: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
                participants: {
                    include: { user: true },
                },
            },
        });

        return Event.from(eventPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

// al geupdate met story 20 (moet nagekeken worden)
const getEventsByClub = async ({id}: {id: number}): Promise<Event[] | null> => {
    try {
        const eventPrisma = await database.event.findMany({
            where: { id: id },
            include: {
                club: {
                    include: {
                        organiser: {
                            include: {
                                user: true,
                            },
                        },
                        members: {
                            include: {
                                user: true, 
                            },
                        },
                    },
                },
                participants: {
                    include: {
                        user: true, 
                    },
                },
            },
        });

        return eventPrisma.length > 0 ? eventPrisma.map(Event.from) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllEvents,
    getEventById,
    createNewEvent,
    getEventsByClub
};
