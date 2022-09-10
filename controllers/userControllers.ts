import { NextFunction, Request, Response } from "express";
import { generatePassword, issueJWT, validatePassword } from "../authentication/utils";
import UserModel from "../models/User";
import { AuthenticatedRequest } from '../@types/ExpressExtended';

async function userLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(200).json({ success: false, msg: "Could not find user with that email" });
        }
        else {
            const isPassValid = validatePassword(req.body.password, user.password, user.salt);
        
            if (isPassValid) {
                const jwtToken = issueJWT(user);
    
                const userToSend = {
                    name: user.name,
                    email: user.email,
                    _id: user._id
                }
    
                res.status(200).json({ success: true, user: userToSend, token: jwtToken.token, expiresIn: jwtToken.expiresIn });
            }
            else {
                res.status(500).json({ success: false, msg: "Incorrect password" });
            }
        }
    }
    catch (err) {
        next(err);
    }
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
    const hashedPass = generatePassword(req.body.password);

    const newUser =  new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass.hash,
        salt: hashedPass.salt,
        profilePicture: req.body.profilePicture
    });

    try {
        await newUser.save();
    
        const jwtToken = issueJWT(newUser);

        const userToSend = {
            name: newUser.name,
            email: newUser.email,
            _id: newUser._id
        }

        res.json({success: true, user: userToSend, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
    }
    catch (err) {
        next(err);
    }
}

async function userDetail(req: Request, res: Response) {
    try {
        const user = await UserModel.findById({_id: req.body.userid});
        
        if (user) {
            res.status(200).json({success: true, user: {
                name: user.name,
                email: user.email
            }});
        }
        else {
            res.status(200).json({success: false, msg: "Could not find a user with that id"});
        }
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while querying user: ${err}`})
    }
}

async function userDelete(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;
    
    try {
        await UserModel.findByIdAndRemove({_id: req.user._id});
    
        res.status(200).json({success: true});
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while deleting user: ${err}`});
    }
}

async function userUpdate(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;
    
    try {
        let user = await UserModel.findById({_id: req.user._id});

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            await user.save();

            res.status(200).json({success: true, user: {
                name: user.name,
                email: user.email
            }});
        }
        else {
            res.status(200).json({success: false, msg: "Could not find a user with that id"});
        }
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while updating user: ${err}`});
    }
}

async function userUpdatePassword(request: Request, res: Response) {
    const req = request as AuthenticatedRequest;

    try {
        let user = await UserModel.findById({_id: req.user._id});

        if (user) {
            const hashedPass = generatePassword(req.body.password);

            user.password = hashedPass.hash;
            user.salt = hashedPass.salt;

            await user.save();

            const jwtToken = issueJWT(user);

            const userToSend = {
                name: user.name,
                email: user.email,
                _id: user._id
            }

            res.status(200).json({ success: true, user: userToSend, token: jwtToken.token, expiresIn: jwtToken.expiresIn });
        }
        else {
            res.status(200).json({success: false, msg: "Could not find a user with that id"});
        }
    }
    catch (err) {
        res.status(500).json({success: false, msg: `Error while updating user password: ${err}`});
    }
}

export {
    userDetail,
    userDelete,
    userUpdate,
    userUpdatePassword,
    userLogin,
    registerUser
}