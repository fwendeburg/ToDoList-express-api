import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect, ConnectOptions } from 'mongoose';
import taskRouter from './routes/tasksRoutes';
import projectsRouter from './routes/projectsRoutes';
import userRouter from './routes/userRoutes';
import passport from "passport";
import "./authentication/passportConfig";
import { ValidationErrorHandler, RouteNotFoundHandler, CastErrorHandler } from './error_handling/errorHandlers'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// DB connection
(async function() {
  try {
    await connect(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
  }
  catch (error) {
    console.log("Database connection failed! - " + error);
  }
})();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Routes
app.use('/tasks', passport.authenticate('jwt', { session: false }), taskRouter);
app.use('/projects', passport.authenticate('jwt', { session: false }), projectsRouter);
app.use('/users', userRouter);

app.use(RouteNotFoundHandler);

// Error Handling
app.use(ValidationErrorHandler);
app.use(CastErrorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});