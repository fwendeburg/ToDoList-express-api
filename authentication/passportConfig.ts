import passport from "passport";
import UserModel, { IUser } from "../models/User";
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from "passport-jwt";

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.RSA_PUB_KEY}`,
    algorithms: ['RS256']
},
async function(jwtPayload, done) {
    try {
        const user = await UserModel.findOne({ _id: jwtPayload.userId });
        
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error);
    }
}));