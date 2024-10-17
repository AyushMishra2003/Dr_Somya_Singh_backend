import { Router } from "express";
import { addAdmin, loginAdmin, logoutAdmin } from "../controller/admin.Controller.js";


const adminRouter=Router()


adminRouter.post("/",addAdmin)
adminRouter.post("/login",loginAdmin)
adminRouter.get("/logout",logoutAdmin)


export default adminRouter