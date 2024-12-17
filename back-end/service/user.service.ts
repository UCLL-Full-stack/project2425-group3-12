import {User} from "../model/user";
import userDB from "../repository/user.db";


const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const createUser = async (user: User): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username: user.getUsername() });

    if (existingUser) {
        throw new Error(`User with username ${user.getUsername()} is already registered.`);
    }

    return await userDB.createUser(user);
}
export default { getAllUsers, getUserByUsername, createUser };