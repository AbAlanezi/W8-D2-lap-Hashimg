import express from 'express'
import { connectDB } from './config/db';
import userRoute from './router/user.router'
import TDLRoute from './router/ToDoList'
import * as dotenv from 'dotenv'
import  cors from 'cors'
dotenv.config()


const app = express()
const PORT = process.env.PORT
app.use(express.json())


app.use(cors())
app.use('/user', userRoute)
app.use('/toDoList', TDLRoute)


app.listen(PORT, ()=> console.log(`server is runing on port ${PORT}`));
connectDB()