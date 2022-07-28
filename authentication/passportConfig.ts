import passport from "passport";
import UserModel, { IUser } from "../models/User";
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from "passport-jwt";

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.AUTH_SECRET}`
},
async function(jwtPayload, done) {
    UserModel.findOne({ _id: jwtPayload.userId }).then(user => {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }).catch(error => done(error));
}));