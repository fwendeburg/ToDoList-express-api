import { Document, Schema, model, Types } from 'mongoose';
import { IUser } from './User';

enum TaskPriority {
    Low,
    Medium,
    High
}

interface ITask extends Document {
    name: string,
    description?: string,
    dueDate?: Date,
    dateAdded: Date,
    priority?: TaskPriority
    isCompleted: boolean,
    owner: IUser["_id"]
}

const TaskSchema = new Schema({
    name: {
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true,
        maxLength: 100},
    description: { type: String },
    dueDate: {
        type: Date,
        validate: [function(this: ITask) {
            if (this.dueDate instanceof Date) {
                return this.dueDate > this.dateAdded;
            }
            
            return true;
        }]
    },
    dateAdded: { type: Date, required: true },
    priority: { type: Number, enum: [0, 1, 2], required: true },
    isCompleted: { type: Boolean, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export {
    ITask,
    TaskSchema
}

export default model<ITask>('Task', TaskSchema);