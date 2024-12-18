import {Member} from "../model/member";
import database from "./database";

const getAllMembers = async () : Promise<Member[]> => {
    try {
        const membersPrisma = await database.member.findMany({
            include: { user: true },
        });
        return membersPrisma.map((memberPrisma) => Member.from(memberPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getMemberById = async ({id} : {id : number}) : Promise<Member | null> => {
    try {
        const memberPrisma = await database.member.findUnique({
            where : {id},
            include: { user: true },
        });

        return memberPrisma ? Member.from(memberPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createMember = async (member : Member) : Promise<Member> => {
    try {
        const memberPrisma = await database.member.create({
            data : {
                user: {
                    create: {
                        username: member.getUser().getUsername(),
                        password: member.getUser().getPassword(),
                        firstName: member.getUser().getFirstName(),
                        lastName: member.getUser().getLastName(),
                        email: member.getUser().getEmail(),
                        role: member.getUser().getRole(),
                    },
                },
            },
            include: { user: true },
        });

        return Member.from(memberPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllMembers,
    getMemberById,
    createMember,
};