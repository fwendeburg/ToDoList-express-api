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
        required: [true, "The name field is required"], 
        trim: true,
        maxLength: [35, "The max length of the name is 35 characters"]
    },
    email: {type: String, 
        lowercase: true, 
        required: [true, "The email field is required"], 
        trim: true,
        maxLength: [50, "The max length of the email is 50 characters"],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true,
        validate: {
            validator: async function(this: IUser): Promise<boolean> {
                        const user = await UserModel.findOne({email: this.email});

                        return (user == null || user._id.toString() == this._id.toString());
                    },
            message: "A user with this email already exists"
        }
    },
    password: { 
        type: String, 
        required: [true, "The password field is required"],    
    },
    salt: { type: String, required: [true, "The salt used to hash the user's password can't be empty"] },
});

export {
    IUser,
    UserSchema
}

const UserModel = model<IUser>('Users', UserSchema);

export default UserModel;