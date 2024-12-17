import {Organiser} from "../model/organiser";
import organiserDB from "../repository/organiser.db";

const getAllOrganisers = async (): Promise<Organiser[]> => organiserDB.getAllOrganisers();

const getOrganiserById = async (id: number): Promise<Organiser> => {
    const organiser = await organiserDB.getOrganiserById({ id });
    if (!organiser) throw new Error(`Organiser with id ${id} does not exist.`);
    return organiser;
}

export default { getAllOrganisers, getOrganiserById };