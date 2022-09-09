import { Request } from "express"

export interface AuthenticatedRequest extends Request {
    user: {
        name: string,
        email: string,
        profilePicture: string,
        _id: string
    }
}