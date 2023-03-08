import { prisma } from '../config/db'
import { Request, Response } from 'express'

export const createTDL = async (req:Request, res:Response)=>{
    try{
        const taske = req.body.title
    await prisma.taske.create({
            
            data:{
                title: taske,
                userId: res.locals.user.id
            }
        })
        res.json({
            message: "Taske created!"
        })
    }catch(e){
        console.log(e)
    }
}
 
export const deleteTaske = async (req:Request, res:Response)=>{
    try{
     const id = req.params.id
     const user_id = res.locals.user.id
     await prisma.taske.deleteMany({
        where:{
            id: id, 
            userId: user_id
        },
     })
     console.log(id)
     console.log(user_id)
     console.log(id)
     res.json({
        message: "Taske deleted!"
    })
    }catch(e){
    console.log(e)
    }
}
export const updeteTaske = async (req:Request, res:Response)=>{
    try{
     const id = req.params.id
     const taskes = req.body
     const user_id = req.body.userId
     const taske = await prisma.taske.updateMany({
        where:{
            id: id, 
            userId: res.locals.user.id
        },
        data:taskes
     })
     if(taske.count == 0){
        res.json({
            message: "Taske not updated!"
        })
     }else{
         res.json({
            message: "Taske updated!"
        })
     }
    }catch(e){
        res.status(500)
    console.log(e)
    }
}

export const getAllTaskeByUserId = async (req:Request, res:Response)=>{
    try{
    //  const id = req.params.userId
     const bookId = await prisma.taske.findMany({
        where:{
            userId: res.locals.user.userId
        },
        select:{
            title:true,
            user:{
                select:{
                    name: true,
                    
                }
            }
        }
     })
     if(bookId.length == 0){
      res.json({
        message: 'bookId is invalid'
      })
    
     }else(
         res.json(bookId)

     )
     
    }catch(e){
        console.log(e)
    }
}