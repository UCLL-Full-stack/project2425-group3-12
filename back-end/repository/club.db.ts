import { Club } from "../model/club";
import database from "./database";

const getAllClubs = async (): Promise<Club[]> => {
    try {
        const clubsPrisma = await database.club.findMany({
            include: {
                organiser: {
                    include: {
                        user: true
                    }
                },
                members: {
                    include: {
                        user: true
                    }
                },
                events: true
            }
        });

        return clubsPrisma.map(Club.from);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getClubsForOrganiser = async ({ username }: { username: string }): Promise<Club[]> => {
    try {
        const clubsPrisma = await database.club.findMany({
            where: { organiser: { user: { username } } },
            include: {
                organiser: {
                    include: {
                        user: true
                    }
                },
                members: {
                    include: {
                        user: true
                    }
                },
                events: true
            }
        });

        return clubsPrisma.map(Club.from);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


const getClubById = async ({ id }: { id: number }): Promise<Club | null> => {
    try {
        const clubPrisma = await database.club.findUnique({
            where: { id },
            include: {
                organiser: {
                    include: {
                        user: true
                    }
                },
                members: {
                    include: {
                        user: true
                    }
                },
                events: true
            }
        });

        return clubPrisma ? Club.from(clubPrisma) : null;
    } 
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createClub = async (club: Club): Promise<Club> => {
    try {
        const clubPrisma = await database.club.create({
            data: {
                name: club.getName(),
                description: club.getDescription(),
                type: club.getType(),
                organiser: {
                    connect: {
                        id: club.getOrganiser().getId()
                    }
                },
                members: {
                    connect: club.getMembers().map(member => ({
                        id: member.getId()
                    }))
                }
            },
            include: {
                organiser: {
                    include: {
                        user: true
                    }
                },
                members: {
                    include: {
                        user: true
                    }
                },
                events: true
            }
        });

        return Club.from(clubPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const updateMemberListForClub = async ({
    club,
}:{
    club: Club;
}): Promise<Club | null> => {
    try {
        const clubPrisma = await database.club.update({
            where: { id: club.getId() },
            data: {
                members: {
                    connect: club.getMembers().map(member => ({ id: member.getId() }))
                }
            },
            include: {
                organiser: {
                    include: {
                        user: true
                    }
                },
                members: {
                    include: {
                        user: true
                    }
                },
                events: true
            }
        });

        return clubPrisma ? Club.from(clubPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllClubs,
    getClubsForOrganiser,
    getClubById,
    createClub,
    updateMemberListForClub,
};