import { NextFunction, Request, Response } from "express";
import { generatePassword, issueJWT, validatePassword } from "../authentication/utils";
import UserModel from "../models/User";
import { AuthenticatedRequest } from '../@types/ExpressExtended';

async function userLogin(req: Request, res: Response, next: NextFunction) {
    if (!(req.body.email && req.body.password)) {
        res.status(400).json({message: `The request is missing the ${!req.body.email? 'email, ' : ''}${!req.body.password? 'password ' : ''}items in the request body`});
        return;
    }

    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(200).json({ success: false, message: "Could not find user with that email" });
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
                res.status(200).json({ success: false, message: "Incorrect password" });
            }
        }
    }
    catch (err) {
        next(err);
    }
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    
    if (!(body.name && body.email && body.password)) {
        res.status(400).json({message: `The request is missing the ${!body.name? 'name, ' : ''}${!body.email? 'email ' : ''}${!body.password? ', password ' : ''}items in the request body`});
        return;
    }

    try {
        const hashedPass = generatePassword(req.body.password);

        const newUser =  new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass.hash,
            salt: hashedPass.salt,
        });

        await newUser.save();
    
        const jwtToken = issueJWT(newUser);

        const userToSend = {
            name: newUser.name,
            email: newUser.email,
            _id: newUser._id
        }

        res.status(200).json({user: userToSend, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
    }
    catch (err) {
        next(err);
    }
}

async function userDetail(req: Request, res: Response, next: NextFunction) {
    if (!req.params.userid) {
        res.status(400).json({message: `The request is missing the userId in the request parameters`});
        return;
    }

    try {
        const user = await UserModel.findById({_id: req.params.userid});
        
        if (user) {
            res.status(200).json({success: true, user: {
                name: user.name,
                email: user.email
            }});
        }
        else {
            res.status(200).json({success: false, message: "Could not find a user with that id"});
        }
    }
    catch (err) {
        next(err);
    }
}

async function userDelete(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    try {
        await UserModel.findByIdAndRemove({_id: req.user._id});
    
        res.status(200).json({success: true});
    }
    catch (err) {
        next(err);
    }
}

async function userUpdate(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;
    
    if (!req.body.name && !req.body.email) {
        res.status(400).json({message: `The request is missing the name and/or email items in the request body`});
        return;
    }

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
            res.status(200).json({success: false, message: "Could not find a user with that id"});
        }
    }
    catch (err) {
        next(err);
    }
}

async function userUpdatePassword(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthenticatedRequest;

    if (!req.body.password) {
        res.status(400).json({message: `The request is missing the password argument in the request body`});
        return;
    }

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
        next(err);
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