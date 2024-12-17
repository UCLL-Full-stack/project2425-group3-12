import { Event } from '../model/event';
import { User } from "../model/user";
import { Member } from "../model/member";
import { Organiser } from "../model/organiser";
import { Club } from "../model/club";

import database from "./database";

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
