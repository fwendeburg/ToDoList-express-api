import { Document, Schema, model } from 'mongoose';
import { TaskSchema, ITask } from './Task';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    tasks: ITask[];
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
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: { type: String, required: true, maxLength: 25 },
    profilePicture: String,
    tasks: { type: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }], required: true }
});

export {
    IUser,
    UserSchema
}

export default model<IUser>('Users', UserSchema);