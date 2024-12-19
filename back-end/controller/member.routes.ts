/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The member ID
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int64
 *               description: The user ID
 *             username:
 *               type: string
 *               description: The user's username
 *             firstName:
 *               type: string
 *               description: The user's first name
 *             lastName:
 *               type: string
 *               description: The user's last name
 *             email:
 *               type: string
 *               description: The user's email
 *             role:
 *               type: string
 *               description: The user's role
 *     MemberInput:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           format: int64
 *           description: The ID of the associated user
 */
import express, { NextFunction, Request, Response } from 'express';
import memberService from '../service/member.service';
import {Role} from "../types";

const memberRouter = express.Router();

/**
 * @swagger
 * /members/by-username/{username}:
 *   get:
 *     tags: [Member]
 *     summary: Get a member by username
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the member to retrieve
 *     responses:
 *       200:
 *         description: Member details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 */
memberRouter.get("/by-username/:username", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const result = await memberService.getMemberByUsername({ username, role });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export {memberRouter};