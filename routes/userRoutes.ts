import { Router } from "express";
import passport from "passport";
import { userDetail, userUpdate, userDelete } from '../controllers/userControllers'
import { login, register } from "../controllers/authControllers";


let userRouter = Router();

userRouter.get('/:userid', passport.authenticate('jwt', { session: false }), userDetail);

userRouter.put('/:userid', passport.authenticate('jwt', { session: false }), userUpdate);

userRouter.delete('/:userid', passport.authenticate('jwt', { session: false }), userDelete);

userRouter.post('/login', login);

userRouter.post('/register', register);

export default userRouter;