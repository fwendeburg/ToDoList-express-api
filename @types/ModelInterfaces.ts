import { Document } from "mongoose";

enum TaskPriority {
    Low,
    Medium,
    High
}

export interface ITask extends Document {
    title: string;
    description?: string;
    dueDate?: Date;
    dateCreated: Date;
    priority: TaskPriority;
    isCompleted: boolean;
    owner: IUser["_id"];
    project: IProject["_id"];
}

export interface IProject extends Document {
    title: string;
    description?: string;
    dueDate?: Date;
    dateCreated: Date;
    owner: IUser["_id"];
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    salt: string;
}