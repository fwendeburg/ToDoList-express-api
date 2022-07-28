import { NextFunction, Request, Response } from "express";
import { generatePassword, issueJWT, validatePassword } from "../utils/auth";
import UserModel from "../models/User";


function login(req: Request, res: Response, next: NextFunction) {
    UserModel.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            res.status(401).json({ success: false, msg: "user not found" });
        }
        else {
            const isPassValid = validatePassword(req.body.password, user.password, user.salt);
        
            if (isPassValid) {
                const jwtToken = issueJWT(user);

                res.status(200).json({ success: true, user: user, token: jwtToken.token, expiresIn: jwtToken.expiresIn })
            }
            else {
                res.status(401).json({ success: false, msg: "incorrect password" });
            }
        }
    }).catch(error => next(error));
}

function signup(req: Request, res: Response, next: NextFunction) {
    const hashedPass = generatePassword(req.body.password);

    const newUser =  new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass.hash,
        salt: hashedPass.salt,
        profilePicture: req.body.profilePicture,
        tasks: [],
        projects: [],
    });

    newUser.save().then(user => {
        const jwtToken = issueJWT(user);

        res.json({success: true, user: user, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
    }).catch(error => next(error));
}

export {
    login,
    signup
}