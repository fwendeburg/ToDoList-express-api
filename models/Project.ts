import { Document, Schema, model, Types } from 'mongoose';
import { ITask } from './Task';
import { IUser } from './User';

interface IProject extends Document {
    name: string;
    description?: string;
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