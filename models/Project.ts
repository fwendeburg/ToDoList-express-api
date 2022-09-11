import { Document, Schema, model, Types } from 'mongoose';
import { ITask } from './Task';
import { IUser } from './User';

interface IProject extends Document {
    title: string;
    description?: string;
    dueDate?: Date;
    dateCreated: Date;
    owner: IUser["_id"];
}

const ProjectSchema = new Schema({
    title: {
        type: String, 
        trim: true,
        maxLength: [70, "The max length of the project title is 70 characters"],
        required: [true, "The project title can't be empty"]
    },
    description: { type: String, trim: true },
    dueDate: {
        type: Date,
        validate: {
            validator: function(this: IProject) {
                            if (this.dueDate instanceof Date) {
                                return this.dueDate > this.dateCreated;
                            }
                            
                            return true;
                        },
            message: "The due date cannot be before the current date"
        }
    },
    dateCreated: { type: Date, required: true, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: [true, "The project must have an owner"] }
});

export {
    IProject,
    ProjectSchema
}

const ProjectModel = model<IProject>('Projects', ProjectSchema);

export default ProjectModel;