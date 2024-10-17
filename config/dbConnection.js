import mongoose from "mongoose";
import cloudinary from 'cloudinary'
import fs from 'fs'; // For file deletion if needed
// import LocalCategoryModel from "../models/Local/LocalCategoryModel.js";
// import airpotCategory from "../models/Airpot/AirpotCategoryModel.js";
// import CityRate from "../models/Booking/CityRate.js";
// import Booking from "../models/Booking/Booking.model.js";
mongoose.set('strictQuery',false)

const ConnectionToDB=async()=>{
    try{
    const {connection}=await mongoose.connect(
        process.env.MONGODB_URL
    )

    if(connection){
        console.log("Connected to Mongoo DB");
    }
   } catch(e){
    console.log(e);
    process.exit(1)
   }
}


export default ConnectionToDB