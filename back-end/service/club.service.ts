import { Club } from "../model/club"
import clubDb from "../repository/club.db"

const getAllClubs = async () : Promise<Club[]> => { return clubDb.getAllClubs() }

const getClubById = async (id: number) : Promise<Club> => {
    const club = await clubDb.getClubById({id})
    if (!club) throw new Error(`Club with id ${id} does not exist`)
    return club
}

export default { getAllClubs, getClubById }