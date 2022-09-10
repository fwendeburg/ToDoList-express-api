import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from 'mongoose';
import { getErrorsFromValidationError } from './utils'

export function ValidationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof MongooseError.ValidationError) {
        res.status(422).json({type: "ValidationError", errors: getErrorsFromValidationError(err)});
    }
    else {
        next(err);
    }
}

export function CastErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof MongooseError.CastError) {
        res.status(400).json({message: "The id passed in the request cannot be converted to an ObjectId"});
    }
    else {
        next(err);
    }
}

export function RouteNotFoundHandler(req: Request, res: Response) {
    res.sendStatus(404);
}
