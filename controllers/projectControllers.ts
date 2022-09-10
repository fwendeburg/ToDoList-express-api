import { Response, Request } from "express";
import ProjectModel from "../models/Project";
import TaskModel from "../models/Task";
import { AuthenticatedRequest } from '../@types/ExpressExtended';
 
async function projectList(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    try {
        const projects = await ProjectModel.find({owner: req.user._id});

        res.status(200).json({success: true, projects: projects});
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while querying projects: ${err}`});
    }
}

async function projectDetail(request: Request, res: Response) {
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
    catch (error) {
        res.status(500).json({success: false, msg: `Error while querying project: ${error}`});
    }
}

async function projectDelete(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    try {
        const project = await ProjectModel.findByIdAndRemove({_id: req.params.taskid});
        
        res.status(200).json({success: true})
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while removing project: ${err}`});
    }
}

async function projectUpdate(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;
    
    try {
        let project = await ProjectModel.findById({_id: req.params.projectid});
        
        if (project) {
            project.title = req.body.name || project.title;
            project.description = req.body.description || project.description;
            project.dueDate = req.body.dueDate || project.dueDate;
        
            await project.save();

            res.status(200).json({success: true, task: project});
        }
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while updating project: ${err}`});
    }
}

async function projectCreate(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    const newProject = new ProjectModel({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        owner: req.user._id
    });

    try {
        await newProject.save();

        res.status(200).json({success: true, project: newProject});
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while creating project: ${err}`});
    }
}

export {
    projectList,
    projectDetail,
    projectDelete,
    projectUpdate,
    projectCreate
}