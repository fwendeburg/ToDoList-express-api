import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect, ConnectOptions } from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// DB connection
(async function() {
  try {
    await connect(process.env.DBCONNECTIONSTR as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
  }
  catch (error) {
    console.log("Database connection failed!");
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(function (req: Request, res: Response) {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});