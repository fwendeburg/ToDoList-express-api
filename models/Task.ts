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
    project?: IProject["_id"];
}

const TaskSchema = new Schema({
    title: {
        type: String, 
        required: [true, "The task title can't be empty"], 
        trim: true,
        maxLength: [70, "The max length of the task title is 70 characters"]
    },
    description: { type: String, trim: true},
    dueDate: {
        type: Date,
        validate: {
            validator: function(this: ITask) {
                            if (this.dueDate instanceof Date) {
                                return this.dueDate > this.dateCreated;
                            }
                            
                            return true;
                        },
            message: "The due date cannot be before the current date"
        }
    },
    dateCreated: { type: Date, required: true, default: Date.now },
    priority: { type: Number, enum: { values: [0, 1, 2], message: "Priority can only take values [0, 2]" }, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: [true, "The task must have an owner"] },
    project: { type: Schema.Types.ObjectId, ref: 'Projects' }
});

export {
    ITask,
    TaskSchema
}

const TaskModel = model<ITask>('Tasks', TaskSchema);

export default TaskModel;