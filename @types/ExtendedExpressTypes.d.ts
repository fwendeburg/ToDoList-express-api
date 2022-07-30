declare namespace Express {
    interface Request {
        user: {
            name: string,
            email: string,
            profilePicture: string,
            _id: string
        }
    }
}
