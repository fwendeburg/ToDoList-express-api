import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect, ConnectOptions } from 'mongoose';
import indexRouter from './routes/indexRoutes';
import taskRouter from './routes/tasksRoutes';
import projectsRouter from './routes/projectsRoutes';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import passport from "passport";
import "./authentication/passportConfig";

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
    console.log("Database connection failed! " + error);
  }
})();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Routes
app.use('/', authRouter, indexRouter);
app.use('/tasks', passport.authenticate('jwt', { session: false }), taskRouter);
app.use('/projects', passport.authenticate('jwt', { session: false }), projectsRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), userRouter);


app.use(function (req: Request, res: Response) {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});