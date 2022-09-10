import { Error as MongooseError } from 'mongoose';

export function getErrorsFromValidationError(error: MongooseError.ValidationError) {
    let errorList: {
        [key: string]: string
    } = {};

    for (let path in error.errors) {
        errorList[path] = error.errors[path].message;
    }

    return errorList;
}