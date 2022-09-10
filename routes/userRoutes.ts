import { Router } from "express";
import passport from "passport";
import {userDelete, userLogin, userUpdate, userUpdatePassword, userDetail, registerUser} from '../controllers/userControllers';

let userRouter = Router();

userRouter.get('/:userid', passport.authenticate('jwt', { session: false }), userDetail);

userRouter.put('/:userid', passport.authenticate('jwt', { session: false }), userUpdate);

userRouter.delete('/:userid', passport.authenticate('jwt', { session: false }), userDelete);

userRouter.post('/:userid/changepassword', passport.authenticate('jwt', { session: false }), userUpdatePassword);

userRouter.post('/login', userLogin);

userRouter.post('/register', registerUser);

export default userRouter;