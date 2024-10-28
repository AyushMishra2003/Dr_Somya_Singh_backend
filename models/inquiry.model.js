import { model, Schema } from "mongoose"

const inquirySchema=new Schema(
    {
        fullName:{
            type:String
        },
        email:{
            type:String
        },
        phoneNumber:{
            type:String
        },
        message:{
            type:String
        }     
    },
    {
        timestamps:true
    }
)

const InquiryModel=model("DR_SOMYA_ENQUIRY",inquirySchema)

export default InquiryModel

