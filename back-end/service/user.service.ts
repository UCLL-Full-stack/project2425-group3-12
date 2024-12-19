import {User} from "../model/user";
import userDB from "../repository/user.db";
import bcrypt from "bcrypt";
import {AuthenticationResponse, UserInput} from "../types";
import {generateJwtToken} from "../util/jwt";


const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const createUser = async ({username, firstName, lastName, email, role, password}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });
    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, firstName, lastName, email, role, password: hashedPassword });
    return await userDB.createUser(user);
}

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });
    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Incorrect username or password');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: user.getUsername(),
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole()
    }
}

export default { getAllUsers, getUserByUsername, createUser, authenticate };