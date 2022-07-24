import { Document, Schema, model } from 'mongoose';
import { IProject } from './Project';
import { ITask } from './Task';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    tasks: ITask[];
    projects: IProject[];
}

const UserSchema = new Schema({
    name: {
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true,
        maxLength: 25
    },
    email: {type: String, 
        lowercase: true, 
        required: true, 
        trim: true,
        maxLength: 25,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true
    },
    password: { type: String, required: true, maxLength: 25 },
    profilePicture: { type: String, required: true },
    tasks: { type: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }], required: true },
    projects: { type: [{ type: Schema.Types.ObjectId, ref: 'Projects' }], required: true }
});

export {
    IUser,
    UserSchema
}

const UserModel = model<IUser>('Users', UserSchema);

export default UserModel;