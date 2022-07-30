import { Router } from "express";
import passport from "passport";
import {userDelete, userLogin, userUpdate, userDetail, registerUser} from '../controllers/userControllers'


let userRouter = Router();

userRouter.get('/:userid', passport.authenticate('jwt', { session: false }), userDetail);

userRouter.put('/:userid', passport.authenticate('jwt', { session: false }), userUpdate);

userRouter.delete('/:userid', passport.authenticate('jwt', { session: false }), userDelete);

userRouter.post('/login', userLogin);

userRouter.post('/register', registerUser);

export default userRouter;