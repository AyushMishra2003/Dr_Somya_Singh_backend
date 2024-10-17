import { Router } from "express";
import { addInquiry, deleteAllInquiries, deleteInquiry, getInquiry } from "../controller/inquiry.controller.js";





const inquiryRoute = Router();

inquiryRoute.post("/", addInquiry);
inquiryRoute.get("/", getInquiry);
inquiryRoute.delete("/:id", deleteInquiry);
inquiryRoute.delete("/delete/all", deleteAllInquiries);

export default inquiryRoute;
