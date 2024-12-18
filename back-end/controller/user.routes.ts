/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The user ID
 *         username:
 *           type: string
 *           description: The user's username
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         role:
 *           type: string
 *           description: The user's role
 *         password:
 *           type: string
 *           description: The user's password (hashed)
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username
 *         password:
 *           type: string
 *           description: User password
 *         firstName:
 *           type: string
 *           description: First name
 *         lastName:
 *           type: string
 *           description: Last name
 *         email:
 *           type: string
 *           description: E-mail
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     Role:
 *       type: string
 *       enum:
 *         - student
 *         - lecturer
 *         - admin
 *         - guest
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               username: "john.doe"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Authentication successful"
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 username:
 *                   type: string
 *                   description: Username of authenticated user
 *                   example: "john.doe"
 *                 fullname:
 *                   type: string
 *                   description: Full name of authenticated user
 *                   example: "John Doe"
 *                 role:
 *                   type: string
 *                   description: Role of authenticated user
 *                   example: "member"
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: "Authentication successful", ...response });
    } catch (error) {
        next(error);
    }
});
export { userRouter };