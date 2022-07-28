import crypto from 'crypto';
import { IUser } from '../models/User';
import jsonwebtoken from 'jsonwebtoken';
import { json } from 'stream/consumers';

function generatePassword(pass: string): { salt: string, hash: string } {
    let salt: string = crypto.randomBytes(32).toString('hex');
    let hash: string = crypto.pbkdf2Sync(pass, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash
    }
}

function validatePassword(newPass: string, storedHash: string, salt: string): boolean {
    let newHash: string = crypto.pbkdf2Sync(newPass, salt, 10000, 64, 'sha512').toString('hex');

    return storedHash == newHash;
}

function issueJWT(user: IUser) {
    const payload = {
        sub: user._id,
        iat: Date.now()
    }

    const expiresIn: string = '4d'; 

    const signedToken = jsonwebtoken.sign(payload, <string>process.env.AUTH_SECRET, { expiresIn: expiresIn });

    return {
        token: `Bearer ${signedToken}`,
        expiresIn: expiresIn
    }
}

export {
    generatePassword,
    validatePassword,
    issueJWT
}