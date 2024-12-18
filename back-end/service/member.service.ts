import {Member} from "../model/member";
import memberDB from "../repository/member.db";

const getAllMembers = async (): Promise<Member[]> => memberDB.getAllMembers();

export default { getAllMembers };