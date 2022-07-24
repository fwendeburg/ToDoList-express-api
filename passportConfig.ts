import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel, { IUser } from "./models/User";
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from "passport-jwt";


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async function(email: string, password: string, done) {
    try {
        const user: IUser | null = await UserModel.findOne({email});

        if (!user) {
            return done(null, false, { message: "Incorrect email"});
        }
        else if (user.password != password) {
            return done(null, false, { message: "Incorrect password"});
        }
        else {
            return done(null, user, { message: "Logged in correctly"});
        }
    }
    catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.JWTSECRET}`
},
async function(jwtPayload, done) {
    try {
        const user = await UserModel.findById(jwtPayload.userId);
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));