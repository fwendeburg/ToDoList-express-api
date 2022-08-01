import { Request, Response } from "express";
import ProjectModel from "../models/Project";
import TaskModel from "../models/Task";

function projectList(req: Request, res: Response) {
    ProjectModel.find({owner: req.user._id}).then(projects => {
        res.status(200).json({success: true, projects: projects});
    }).catch(err => res.status(500).json({success: false, msg: `Error while querying projects: ${err}`}));
}

async function projectDetail(req: Request, res: Response) {
    try {
        const project = await ProjectModel.findById({_id: req.params.projectid});

        if (project) {
            const tasks = await TaskModel.find({project: project._id});

            res.status(200).json({success: true, project: project, tasks: tasks});
        }
    }
    catch (error) {
        res.status(500).json({success: false, msg: `Error while querying project: ${error}`});
    }
}

function projectDelete(req: Request, res: Response) {
    ProjectModel.findByIdAndRemove({_id: req.params.taskid}).then(project => {
        res.status(200).json({success: true})
    }).catch(err => res.status(500).json({success: false, msg: `Error while removing project: ${err}`}));
}

async function projectUpdate(req: Request, res: Response) {
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

function projectCreate(req: Request, res: Response) {
    const newProject = new ProjectModel({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        owner: req.user._id
    });

    newProject.save().then(project => {
        res.status(200).json(project);
    }).catch(err => res.status(500).json({success: false, msg: `Error while creating project: ${err}`}));
}

export {
    projectList,
    projectDetail,
    projectDelete,
    projectUpdate,
    projectCreate
}