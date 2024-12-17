import {Organiser} from "../model/organiser";
import database from "./database";

const getAllOrganisers = async (): Promise<Organiser[]> => {
    try {
        const organisersPrisma = await database.organiser.findMany({
            include: { user: true },
        });
        return organisersPrisma.map((organiserPrisma) => Organiser.from(organiserPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getOrganiserById = async ({ id }: { id: number }): Promise<Organiser | null> => {
    try {
        const organiserPrisma = await database.organiser.findUnique({
            where: { id },
            include: { user: true },
        });

        return organiserPrisma ? Organiser.from(organiserPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createOrganiser = async (organiser: Organiser): Promise<Organiser> => {
    try {
        const organiserPrisma = await database.organiser.create({
            data: {
                user: {
                    create: {
                        username: organiser.getUser().getUsername(),
                        password: organiser.getUser().getPassword(),
                        firstName: organiser.getUser().getFirstName(),
                        lastName: organiser.getUser().getLastName(),
                        email: organiser.getUser().getEmail(),
                        role: organiser.getUser().getRole(),
                    },
                },
            },
            include: { user: true },
        });

        return Organiser.from(organiserPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllOrganisers,
    getOrganiserById,
    createOrganiser,
};