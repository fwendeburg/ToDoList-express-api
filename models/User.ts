import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    salt: string;
}

const UserSchema = new Schema({
    name: {
        type: String, 
        lowercase: true, 
        required: true, 
        trim: true,
        maxLength: 35
    },
    email: {type: String, 
        lowercase: true, 
        required: true, 
        trim: true,
        maxLength: 50,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true
    },
    password: { type: String, required: true },
    salt: { type: String, required: true },
});

export {
    IUser,
    UserSchema
}

const UserModel = model<IUser>('Users', UserSchema);

export default UserModel;