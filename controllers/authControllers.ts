import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";


function login(req: Request, res: Response) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err || !user) {
            return res.status(500); // Internal server error
        }

        req.login(user, { session: false }, function(err) {
            if (err) {
                res.send(err);
            }
        });

        const payload = {
            email: user.email,
            userId: user._id
        }

        const token: string = jwt.sign(payload, <string>process.env.JWTSECRET);
        return res.json({ 
            payload,
            token: `Bearer ${token}` 
        });
    })(req, res);
}

function signup(req: Request, res: Response) {
    res.send("NOT IMPLEMENTED");
}

export {
    login,
    signup
}