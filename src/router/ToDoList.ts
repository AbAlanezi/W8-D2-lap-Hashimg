import { createTDL, getAllTaskeByUserId, deleteTaske, updeteTaske } from "../controler/toDoList";
import validate from "../middileware/validate";
import { taskeTyeps } from "../zodSchema/zod.taske";
import Router from "express";
import auth from '../middileware/auth'

const router = Router();

router.post('/',auth, createTDL )
router.get('/',auth,getAllTaskeByUserId )
router.delete('/:id',deleteTaske )
router.put('/:id',auth,updeteTaske )

export default router;
