import { prisma } from '../config/db'
import { Request, Response } from 'express'
import * as argon2 from "argon2"
import * as jwt from 'jsonwebtoken'
import { sign } from 'crypto'
import * as dotenv from 'dotenv'
dotenv.config()
const mySeccret = "srcret"
const Seccret = process.env.mySeccret

// const hash = async ()=>{
//     let pass = "123456"
//     let hashPass = await argon2.hash(pass)
//     console.log(pass)
//     console.log(hashPass)
//     const fve = await argon2.verify(hashPass, "not")
//     const tve = await argon2.verify(hashPass, pass)
//     console.log(fve)
//     console.log(tve)
   
// }
// hash()
export const createUser = async (req:Request, res:Response)=>{
    let hash = await argon2.hash(req.body.password)
    try{
        // const user = req.body
  const user = await prisma.user.create({
            data:{
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
        })
        res.json({
            message: "user created!"
        })
    }catch(e){
        console.log(e)
    }
}

export const Login = async (req:Request, res:Response)=>{
    try{
const user = await prisma.user.findUnique({
    where:{
        email: req.body.email
    }
})
if(!user){
    return res.status(400).json({Error:"Wrong email adress"})
}else if(!await argon2.verify(user.password, req.body.password)){
    return res.status(400).json({Error:"Wrong password"})
}else if(user){
    let token = jwt.sign({
      id: user.id,
      name: user.name
    },Seccret as string, {expiresIn:"1h"})
    // console.log(token)
    return res.status(200).json({
        message:`Hello ${user.name}`,
        token: token
    })
}
    }catch(e){
        console.log(e)
    }
}
  