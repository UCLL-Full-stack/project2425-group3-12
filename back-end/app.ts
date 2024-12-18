import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { clubRouter } from './controller/club.routes';
import { eventRouter } from './controller/event.routes';
import { userRouter } from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Define the route for the clubs
app.use('/clubs', clubRouter);   
app.use('/events', eventRouter)
app.use('/users', userRouter);

// Define a route for the back-end status
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

// Configure Swagger for API documentation
// - `swaggerOpts` defines the Swagger options, including the OpenAPI version and basic API info
// - `apis` specifies the location of the route files to be documented
// - `swaggerSpec` generates the Swagger specification based on the provided options
// - `app.use('/api-docs', ...)` sets up the Swagger UI at the `/api-docs` endpoint to serve the generated API documentation
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Generic error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else if (err.name === 'ValidationError') {
        res.status(400).json({ status: 'validation error', message: err.message });
    } else if (err.name === 'DatabaseError') {
        res.status(400).json({ status: 'database error', message: err.message });
    } else if (err.name === 'AuthenticationError') {
        res.status(400).json({ status: 'authentication error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
