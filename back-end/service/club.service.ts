import { Club } from "../model/club"
import clubDb from "../repository/club.db"

const getAllClubs = () : Club[] => { return clubDb.getAllClubs() }

const getClubById = (id: number) : Club => { 
    const club = clubDb.getClubById({id})
    if (!club) throw new Error(`Club with id ${id} does not exist`)
    return club
}

export default { getAllClubs, getClubById }