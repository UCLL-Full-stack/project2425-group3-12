import { Club } from "../model/club"
import clubDb from "../repository/club.db"
import {Role, ClubInput, MemberInput} from "../types";
import memberDb from "../repository/member.db";
import organiserDd from "../repository/organiser.db";
import { GameClubError, ValidationError, AuthenticationError, DatabaseError } from "../util/errors";


const getClubs = async ({username, role}: {username: string; role: Role;}) : Promise<Club[]> => {
    if (role === 'admin' || role === 'member') {
        return clubDb.getAllClubs();
    } else if (role === 'organiser') {
        return clubDb.getClubsForOrganiser({username});
    } else {
        throw new AuthenticationError('You are not authorized to access this resource.');
    }
}

const getClubById = async (id: number) : Promise<Club> => {
    const club = await clubDb.getClubById({id});
    if (!club) throw new Error(`Club with id ${id} does not exist`);
    return club
}

const addMemberToClub = async (
    joinInput: {
        club: ClubInput;
        member: MemberInput;
    },
    authInput: {
        role: Role;
    }
): Promise<Club | null> => {
    if (!joinInput.club.id) throw new ValidationError('Club id is required.');
    if (!joinInput.member.id) throw new ValidationError('Member id is required.');
    if (authInput.role !== 'member') throw new GameClubError('Only members can join a club.');

    const club = await clubDb.getClubById({id: joinInput.club.id});
    if (!club) throw new GameClubError('Club not found');

    const member = await memberDb.getMemberById({id: joinInput.member.id});
    if (!member) throw new GameClubError('Member not found');

    if (club.hasMember(member.getId()!)) {
        throw new GameClubError('Member is already in this club');
    }

    club.addMemberToClub(member);

    try {
        return await clubDb.updateMemberListForClub({club});
    } catch (error) {
        throw new DatabaseError('Failed to update club member list');
    }
}

const createClub = async (clubInput: ClubInput): Promise<Club> => {
    if (!clubInput.organiser.id) throw new ValidationError('Organiser id is required');

    const organiser = await organiserDd.getOrganiserById({id: clubInput.organiser.id});
    if (!organiser) throw new GameClubError('Organiser not found');

    // Initialize with empty members array since they'll be added later
    const club = new Club({
        name: clubInput.name,
        description: clubInput.description,
        type: clubInput.type,
        members: [],
        organiser: organiser,
        events: []
    });

    try {
        return await clubDb.createClub(club);
    } catch (error) {
        throw new DatabaseError('Failed to create club');
    }
}

export default { getClubs, getClubById, addMemberToClub, createClub }