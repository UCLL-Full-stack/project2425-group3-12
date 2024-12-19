/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
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
 *          Event:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  location:
 *                      type: string
 *                  date:
 *                      type: string
 *                      format: date-time
 *                  time:
 *                      type: string
 *                  participants:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
 *                  club:
 *                      $ref: '#/components/schemas/Club'
 */
import express, { NextFunction, Request, Response } from 'express';
import eventService from '../service/event.service';
import {EventInput, EventSignupInput, Role} from '../types';
import {AuthenticationError} from "../util/errors";

const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *  get:
 *      tags: [Event]
 *      security:
 *        - bearerAuth: []
 *      summary: Retrieve a list of all events
 *      responses:
 *          200:
 *              description: A list of events
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Event'
 */
eventRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/{id}:
 *  get:
 *      tags: [Event]
 *      summary: Retrieve an event by its id
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id of the event to retrieve
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: An event
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          404:
 *              description: Event with id ${id} does not exist
 */
eventRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await eventService.getEventById(Number(req.params.id));
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events:
 *  post:
 *      tags: [Event]
 *      summary: Create a new event
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          200:
 *              description: The created event
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */
eventRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = <EventInput>req.body;
        const result = eventService.createNewEvent(event);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/signup:
 *   post:
 *     tags: [Event]
 *     summary: Add a member to an event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *               - member
 *             properties:
 *               event:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the event to join
 *               member:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the member joining the event
 *     responses:
 *       200:
 *         description: The updated event with the new participant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error (e.g., already signed up, invalid role)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: domain error
 *                 message:
 *                   type: string
 *                   example: Member is already signed up for this event
 */
eventRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signupInput = <EventSignupInput>req.body;
        const request = req as Request & { auth: { username: string; role: Role } };
        const { role } = request.auth;
        const result = await eventService.addMemberToEvent(signupInput, { role });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events:
 *   post:
 *      tags: [Event]
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new event
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *                - location
 *                - date
 *                - time
 *                - club
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                location:
 *                  type: string
 *                date:
 *                  type: string
 *                  format: date
 *                time:
 *                  type: string
 *                  pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                club:
 *                  type: object
 *                  required:
 *                    - id
 *                  properties:
 *                    id:
 *                      type: integer
 *      responses:
 *         200:
 *            description: The created event
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Event'
 */
eventRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { role } = request.auth;

        if (role !== 'admin' && role !== 'organiser') {
            throw new AuthenticationError('Only admins and organisers can create events');
        }

        const eventInput = <EventInput>req.body;
        const result = await eventService.createNewEvent(eventInput);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { eventRouter };
