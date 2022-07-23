import { Document, Schema, model, Types } from 'mongoose';
import { ITask } from './Task';

interface IProject {
    name: string;
    description?: string;
    tasks: ITask[];
    dueDate?: Date;
    dateCreated: Date;
}

const ProjectSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        maxLength: 50
    },
    description: { type: String },
    tasks: {type: [{ type: Schema.Types.ObjectId, ref: 'Task' }], required: true },
    dueDate: {
        type: Date,
        validate: [function(this: IProject) {
            if (this.dueDate instanceof Date) {
                return this.dueDate > this.dateCreated;
            }
            
            return true;
        }]
    },
    dateCreated: { type: Date, required: true }
});

export {
    IProject,
    ProjectSchema
}

export default model<IProject>('Projects', ProjectSchema)