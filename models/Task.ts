import { Document, Schema, model, Types } from 'mongoose';
import { IProject } from './Project';
import { IUser } from './User';

enum TaskPriority {
    Low,
    Medium,
    High
}

interface ITask extends Document {
    title: string;
    description?: string;
    dueDate?: Date;
    dateCreated: Date;
    priority: TaskPriority;
    isCompleted: boolean;
    owner: IUser["_id"];
    project: IProject["_id"];
}

const TaskSchema = new Schema({
    title: {
        type: String, 
        required: true, 
        trim: true,
        maxLength: 70
    },
    description: { type: String },
    dueDate: {
        type: Date,
        validate: [function(this: ITask) {
            if (this.dueDate instanceof Date) {
                return this.dueDate > this.dateCreated;
            }
            
            return true;
        }]
    },
    dateCreated: { type: Date, required: true, default: Date.now },
    priority: { type: Number, enum: [0, 1, 2], required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Projects', required: false }
});

export {
    ITask,
    TaskSchema
}

const TaskModel = model<ITask>('Tasks', TaskSchema);

export default TaskModel;