import { Router } from "express";
import passport from "passport";
import {userDelete, userLogin, userUpdate, userUpdatePassword, userDetail, registerUser} from '../controllers/userControllers';

let userRouter = Router();

userRouter.get('/:userid', passport.authenticate('jwt', { session: false }), userDetail);

userRouter.put('/', passport.authenticate('jwt', { session: false }), userUpdate);

userRouter.delete('/', passport.authenticate('jwt', { session: false }), userDelete);

userRouter.post('/login', userLogin);

userRouter.post('/register', registerUser);

export default userRouter;