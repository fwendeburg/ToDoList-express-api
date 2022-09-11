import { Response, Request, NextFunction } from "express";
import ProjectModel from "../models/Project";
import TaskModel from "../models/Task";
import { AuthenticatedRequest } from '../@types/ExpressExtended';
 
async function projectList(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    try {
        const projects = await ProjectModel.find({owner: req.user._id});

        res.status(200).json({success: true, projects: projects});
    }
    catch (err) {
        next(err);
    }
}

async function projectDetail(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    try {
        const project = await ProjectModel.findById({_id: req.params.projectid});

        if (project) {
            const tasks = await TaskModel.find({project: project._id});

            res.status(200).json({success: true, project: project, tasks: tasks});
        }
        else {
            res.status(200).json({success: false, msg: "Could not find a project with that id"});
        }
    }
    catch (err) {
        next(err);
    }
}

async function projectDelete(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    try {
        const project = await ProjectModel.findByIdAndRemove({_id: req.params.projectid});
        
        res.status(200).json({success: true});
    }
    catch (err) {
        next(err);
    }
}

async function projectUpdate(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    if (!(req.body.title || req.body.description || req.body.dueDate)) {
        res.status(400).json({message: `The request is missing the ${!req.body.title? 'title and/or ' : ''}${!req.body.description? 'description and/or ' : ''}${!req.body.dueDate? 'dueDate ' : ''}items in the request body`});
        return;
    }

    try {
        let project = await ProjectModel.findById({_id: req.params.projectid});
        
        if (project) {
            project.title = req.body.title || project.title;
            project.description = req.body.description || project.description;
            project.dueDate = req.body.dueDate || project.dueDate;
        
            await project.save();

            res.status(200).json({success: true, project: project});
        }
    }
    catch (err) {
        next(err);
    }
}

async function projectCreate(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    if (!req.body.title) {
        res.status(400).json({message: `The request is missing the ${!req.body.title? 'title' : ''} item in the request body`});
        return;
    }

    try {
        const newProject = new ProjectModel({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            owner: req.user._id
        });

        await newProject.save();

        res.status(200).json({success: true, project: newProject});
    }
    catch (err) {
        next(err);
    }
}

export {
    projectList,
    projectDetail,
    projectDelete,
    projectUpdate,
    projectCreate
}