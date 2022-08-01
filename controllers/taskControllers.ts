import { Request, Response } from "express";
import TaskModel from "../models/Task";

function taskList(req: Request, res: Response) {
    TaskModel.find({owner: req.user._id}).then(tasks => {
        res.status(200).json({success: true, tasks: tasks});
    }).catch(err => res.status(500).json({success: false, msg: `Error while querying tasks: ${err}`}));
}

function taskDetail(req: Request, res: Response) {
    TaskModel.findById({_id: req.params.taskid}).then(task => {
        res.status(200).json({success: true, task: task});
    }).catch(err => res.status(500).json({success: false, msg: `Error while querying task: ${err}`}));
}

function taskDelete(req: Request, res: Response) {
    TaskModel.findByIdAndRemove({_id: req.params.taskid}).then(task => {
        res.status(200).json({success: true})
    }).catch(err => res.status(500).json({success: false, msg: `Error while removing task: ${err}`}));
}

async function taskUpdate(req: Request, res: Response) {
    try {
        let task = await TaskModel.findById({_id: req.params.taskid});
        
        if (task) {
            task.name = req.body.name || task.name;
            task.description = req.body.description || task.description;
            task.dueDate = req.body.dueDate || task.dueDate;
            task.priority = req.body.priority || task.priority;
            task.isCompleted = (typeof req.body.isCompleted == "undefined"? task.isCompleted : req.body.isCompleted);
            task.project = req.body.project || task.project;
        
            await task.save();

            res.status(200).json({success: true, task: task});
        }
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while updating task: ${err}`});
    }
}

function taskCreate(req: Request, res: Response) {
    const newTask = new TaskModel({
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        owner: req.user._id,
        project: req.body.project
    });

    newTask.save().then(task => {
        res.status(200).json(task);
    }).catch(err => res.status(500).json({success: false, msg: `Error while creating task: ${err}`}));
}

export {
    taskList,
    taskDetail,
    taskDelete,
    taskUpdate,
    taskCreate
}