import { Document, Schema, model, Types } from 'mongoose';
import { ITask } from './Task';
import { IUser } from './User';

interface IProject {
    name: string;
    description?: string;
    tasks: ITask[];
    dueDate?: Date;
    dateCreated: Date;
    owner: IUser["_id"];
}

const ProjectSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        maxLength: 50,
        required: true
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
    dateCreated: { type: Date, required: true, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
});

export {
    IProject,
    ProjectSchema
}

const ProjectModel = model<IProject>('Projects', ProjectSchema);

export default ProjectModel;