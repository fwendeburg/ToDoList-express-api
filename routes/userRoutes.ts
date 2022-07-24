import { Router } from "express";
import { userDetail, userUpdate, userDelete } from '../controllers/userControllers'

let userRouter = Router();

userRouter.put('/:userid', userUpdate);

userRouter.delete('/:userid', userDelete);

export default userRouter;