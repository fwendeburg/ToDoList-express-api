import { Response, Request } from "express";
import TaskModel from "../models/Task";
import { AuthenticatedRequest } from '../@types/ExpressExtended';

async function taskList(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    try {
        const tasks = await TaskModel.find({owner: req.user._id});

        res.status(200).json({success: true, tasks: tasks});
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while querying tasks: ${err}`})
    }  
}

async function taskDetail(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    try {
        const task = await TaskModel.findById({_id: req.params.taskid});

        res.status(200).json({success: true, task: task});
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while querying task: ${err}`});
    }
}

async function taskDelete(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    try {
        await TaskModel.findByIdAndRemove({_id: req.params.taskid});

        res.status(200).json({success: true});
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while deleting task: ${err}`});
    }
}

async function taskUpdate(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    try {
        let task = await TaskModel.findById({_id: req.params.taskid});
        
        if (task) {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.dueDate = req.body.dueDate || task.dueDate;
            task.priority = req.body.priority || task.priority;
            task.isCompleted = (typeof req.body.isCompleted == "undefined"? task.isCompleted : req.body.isCompleted);
            task.project = req.body.project || task.project;
        
            await task.save();

            res.status(200).json({success: true, task: task});
        }
        else {
            res.status(200).json({success: false, msg: "Could not find a task with that id"});
        }
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while updating task: ${err}`});
    }
}

async function taskCreate(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    const newTask = new TaskModel({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        owner: req.user._id,
        project: req.body.project
    });

    try {
        await newTask.save();

        res.status(200).json({success: true, task: newTask});
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while creating task: ${err}`});
    }
}

export {
    taskList,
    taskDetail,
    taskDelete,
    taskUpdate,
    taskCreate
}