import { Router } from "express";
import { taskDelete, taskList, taskDetail, taskCreate, taskUpdate } from "../controllers/taskControllers";

let tasksRouter = Router();

tasksRouter.get('/', taskList);

tasksRouter.get('/:taskid', taskDetail);

tasksRouter.post('/', taskCreate);

tasksRouter.put('/:taskid', taskUpdate);

tasksRouter.delete('/:taskid', taskDelete);

export default tasksRouter;