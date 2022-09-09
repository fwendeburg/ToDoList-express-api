
import { NextFunction, Request, Response } from "express";
import { generatePassword, issueJWT, validatePassword } from "../authentication/utils";
import UserModel from "../models/User";
import { AuthenticatedRequest } from '../@types/ExpressExtended';

function userLogin(req: Request, res: Response, next: NextFunction) {
    UserModel.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            res.status(401).json({ success: false, msg: "user not found" });
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

                res.status(200).json({ success: true, user: userToSend, token: jwtToken.token, expiresIn: jwtToken.expiresIn })
            }
            else {
                res.status(401).json({ success: false, msg: "incorrect password" });
            }
        }
    }).catch(error => next(error));
}

function registerUser(req: Request, res: Response, next: NextFunction) {
    const hashedPass = generatePassword(req.body.password);

    const newUser =  new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass.hash,
        salt: hashedPass.salt,
        profilePicture: req.body.profilePicture
    });

    newUser.save().then(user => {
        const jwtToken = issueJWT(user);

        const userToSend = {
            name: user.name,
            email: user.email,
            _id: user._id
        }

        res.json({success: true, user: userToSend, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
    }).catch(error => next(error));
}

function userDetail(req: AuthenticatedRequest, res: Response) {
    res.send("NOT IMPLEMENTED");
}

function userDelete(req: AuthenticatedRequest, res: Response) {
    res.send("NOT IMPLEMENTED");
}

function userUpdate(req: AuthenticatedRequest, res: Response) {
    res.send("NOT IMPLEMENTED");
}

export {
    userDetail,
    userDelete,
    userUpdate,
    userLogin,
    registerUser
}