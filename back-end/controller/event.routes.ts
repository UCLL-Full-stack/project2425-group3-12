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
 *                      type: integer
 *                  participants:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
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
import express, { NextFunction, Request, Response } from 'express';
import eventService from "../service/event.service";
import { EventInput } from '../types';

const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *  get:
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
eventRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
 *      summary: Retrieve an event by its id
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
eventRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await eventService.getEventById(Number(req.params.id));
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
});


/**
 *  @swagger
 *  /events:
 *    post:
 *      summary: Create a new event.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Event'
 *      responses:
 *          200:
 *              description: The created event.
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
})

export { eventRouter };