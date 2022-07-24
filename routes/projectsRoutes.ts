import { Router } from "express";
import { projectDelete, projectList, projectDetail, projectCreate, projectUpdate } from "../controllers/projectControllers";

let projectsRouter = Router();

projectsRouter.get('/', projectList);

projectsRouter.get('/:projectid', projectDetail);

projectsRouter.post('/', projectCreate);

projectsRouter.put('/:projectid', projectUpdate);

projectsRouter.delete('/:projectid', projectDelete);

export default projectsRouter;
