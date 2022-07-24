import { Router } from "express";
import { index } from "../controllers/indexControllers";
import { login, signup } from "../controllers/authControllers"

let indexRouter = Router();

indexRouter.get('/', index);

export default indexRouter;