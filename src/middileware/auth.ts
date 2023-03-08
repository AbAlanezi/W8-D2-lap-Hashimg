import { NextFunction, Request, Response } from "express"
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
const Seccret = process.env.mySeccret

interface User {
    id: string,
    name: string
}
const auth = (req:Request, res:Response, next:NextFunction)=>{
    try{
        let token = req.headers.authorization
        if(!token){
          return  res.status(403).json({"message": "you are not authorization"})
        }
        const user = jwt.verify(token, Seccret as string) as User
        res.locals.user = user
        next()
    }catch(e){
        res.json(e)
    }
}

export default auth