import { Router } from "express";
import { index } from "../controllers/indexControllers";

let indexRouter = Router();

indexRouter.get('/', index);

export default indexRouter;