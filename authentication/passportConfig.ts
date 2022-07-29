import passport from "passport";
import UserModel, { IUser } from "../models/User";
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from "passport-jwt";
import fs from 'fs';
import { Error } from "mongoose";
import path from "path";

const keyPath = path.join(__dirname, '..', '..', '\\authentication\\id_rsa_pub.pem');
const RSA_PUB_KEY = fs.readFileSync(keyPath, 'utf8');

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: RSA_PUB_KEY,
    algorithms: ['RS256']
},
function(jwtPayload, done) {
    UserModel.findOne({ _id: jwtPayload.sub }, function(err: Error, user: IUser) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));