import {Member} from "../model/member";
import {AuthenticationError, GameClubError} from "../util/errors";
import {Role} from "../types";
import memberDB from "../repository/member.db";

const getAllMembers = async (): Promise<Member[]> => memberDB.getAllMembers();

const getMemberByUsername = async ({username, role}: {username: string; role: Role;}) : Promise<Member> => {
    const member = await memberDB.getMemberByUsername({ username });
    if (!member) {
        throw new GameClubError(`Member not found for username: ${username}`);
    }
    return member;
};

export default { getAllMembers, getMemberByUsername };