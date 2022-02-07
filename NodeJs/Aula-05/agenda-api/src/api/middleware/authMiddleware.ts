import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { authSecret } = require("../../../.env")

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    if(!authorization){
        return res.sendStatus(401);
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, authSecret);

        if(data){
            return next();
        } else {
            return res.sendStatus(401)
        }
    } catch {
        return res.sendStatus(401)
    }
}