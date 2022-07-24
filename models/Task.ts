import { Document, Schema, model, Types } from 'mongoose';
import { IUser } from './User';

enum TaskPriority {
    Low,
    Medium,
    High
}

interface ITask extends Document {
    name: string;
    description?: string;
    dueDate?: Date;
    dateCreated: Date;
    priority: TaskPriority;
    isCompleted: boolean;
    owner: IUser["_id"];
}

const TaskSchema = new Schema({
    name: {
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
    isCompleted: { type: Boolean, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
});

export {
    ITask,
    TaskSchema
}

const TaskModel = model<ITask>('Tasks', TaskSchema);

export default TaskModel;