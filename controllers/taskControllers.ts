import { Response, Request, NextFunction } from "express";
import TaskModel from "../models/Task";
import { AuthenticatedRequest } from '../@types/ExpressExtended';

async function taskList(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    try {
        const tasks = await TaskModel.find({owner: req.user._id});

        res.status(200).json({success: true, tasks: tasks});
    }
    catch (err) {
        next(err);
    }  
}

async function taskDetail(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    try {
        const task = await TaskModel.findById({_id: req.params.taskid});

        res.status(200).json({success: true, task: task});
    }
    catch (err) {
        next(err);
    }
}

async function taskDelete(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    try {
        await TaskModel.findByIdAndRemove({_id: req.params.taskid});

        res.status(200).json({success: true});
    }
    catch (err) {
        next(err);
    }
}

async function taskUpdate(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    if (!(req.body.title || req.body.description || req.body.dueDate || req.body.priority || req.body.isCompleted || req.body.project)) {
        res.status(400).json({message: `The request is missing a property to update`});
        return;
    }

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
        next(err);
    }
}

async function taskCreate(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    if (!(req.body.title && req.body.priority)) {
        res.status(400).json({message: `The request is missing the ${!req.body.title? 'title, ' : ''}${!req.body.priority? 'priority ' : ''}items in the request body`});
        return;
    }

    try {
        const newTask = new TaskModel({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            owner: req.user._id,
            project: req.body.project
        });

        await newTask.save();

        res.status(200).json({success: true, task: newTask});
    }
    catch (err) {
        next(err);
    }
}

export {
    taskList,
    taskDetail,
    taskDelete,
    taskUpdate,
    taskCreate
}