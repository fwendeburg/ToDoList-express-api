import { Router } from "express";
import { login, signup } from "../controllers/authControllers";


let authRouter = Router();

authRouter.post('/login', login);

authRouter.post('/register', signup);

export default authRouter;