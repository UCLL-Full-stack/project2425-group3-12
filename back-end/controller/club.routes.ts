/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          Club:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  type:
 *                      type: string
 *                  members:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Member'
 *                  organiser:
 *                      $ref: '#/components/schemas/Organiser'
 *                  events:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Event'
 *          Member:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                  user:
 *                      $ref: '#/components/schemas/User'
 *          Organiser:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                  user:
 *                      $ref: '#/components/schemas/User'
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  role:
 *                      type: string
 *                      enum: [admin, organiser, member, guest]
 */
import express, { NextFunction, Request, Response } from "express";
import clubService from "../service/club.service";
import {JoinClubInput, Role} from "../types";

const clubRouter = express.Router();

/**
 * @swagger
 * /clubs:
 *  get:
 *      tags: [Club]
 *      summary: Retrieve a list of all clubs
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: A list of clubs
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Club'
 */
clubRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const clubs = await clubService.getClubs({ username, role });
        res.status(200).json(clubs);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /clubs/{id}:
 *  get:
 *      tags: [Club]
 *      summary: Retrieve a club by its id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id of the club to retrieve
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A club
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Club'
 *          404:
 *              description: Club with id ${id} does not exist
 */
clubRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const club = await clubService.getClubById(Number(req.params.id));
        res.status(200).json(club);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /clubs/join:
 *   post:
 *     tags: [Club]
 *     summary: Add a member to a club
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - club
 *               - member
 *             properties:
 *               club:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the club to join
 *               member:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the member joining the club
 *     responses:
 *       200:
 *         description: The updated club with the new member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
 */
clubRouter.post("/join", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const joinInput = <JoinClubInput>req.body;
        const request = req as Request & { auth: { username: string; role: Role } };
        const { role } = request.auth;
        const result = await clubService.addMemberToClub(joinInput, { role });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { clubRouter };