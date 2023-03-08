import { createUser, Login } from "../controler/user";
import validate from "../middileware/validate";
import { TDLtyeps } from "../zodSchema/zod.TDL";
import Router from "express";
const router = Router();

router.post('/',validate(TDLtyeps), createUser )
router.post('/Login', Login )

export default router;
