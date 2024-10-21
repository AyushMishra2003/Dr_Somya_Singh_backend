import InquiryModel from "../models/inquiry.model.js";
import AppError from "../utlis/error.utlis.js";
import nodemailer from 'nodemailer'; // Import Nodemailer

const addInquiry = async (req, res, next) => {
    try {
        const { fullName, email, phoneNumber, message } = req.body;

        console.log(req.body);
        

        console.log("hi i am coming or not ");
        

        // Validate input fields
        if (!fullName || !email || !phoneNumber || !message) {
            return next(new AppError("All fields are required", 400));
        }

        if (phoneNumber.length !== 10) {
            return next(new AppError("Phone number must be 10 digits", 400));
        }

        // Save inquiry to the database
        const inquiry = await InquiryModel.create({
            fullName,
            email,
            phoneNumber,
            message,
        });

        if (!inquiry) {
            return next(new AppError("Inquiry not sent, something went wrong", 402));
        }

        // Nodemailer configuration to send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email (e.g., ayushm185@gmail.com)
                pass: process.env.EMAIL_PASSWORD, // Your email password or app password
            },
        });

        // Prepare email details
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to: 'aggarwal.manas@gmail.com',  // Forwarded email (the recipient)
            subject: 'New Inquiry Received',
            text: `You have received a new inquiry from:\n\n` +
                  `Name: ${fullName}\n` +
                  `Email: ${email}\n` +
                  `Phone: ${phoneNumber}\n` +
                  `Message: ${message}\n\n` +
                  `Thank you for reaching out!`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        // Send the response back to the client
        res.status(200).json({
            success: true,
            message: "Inquiry sent successfully and email forwarded.",
            data: inquiry,
        });

    } catch (error) {
        console.error('Error:', error);
        return next(new AppError("An error occurred while processing your inquiry", 500));
    }
};

const getInquiry = async (req, res, next) => {
  try {
    const allInquiry = await InquiryModel.find({});

    if (!allInquiry) {
      return next(new AppError("Inquiry Not Found", 402));
    }

    res.status(200).json({
      success: true,
      message: "All Inquiry are:-",
      data: allInquiry,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validInquiry = await InquiryModel.findById(id);

    if (!validInquiry) {
      return next(new AppError("Inquiry is Not Valid", 400));
    }

    const deleteInquiry = await InquiryModel.findByIdAndDelete(id);

    // await InquiryModel.save();

    res.status(200).json({
      success: true,
      message: "Inquiry Delete Succesfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteAllInquiries = async (req, res, next) => {
  try {
    const result = await InquiryModel.deleteMany({}); // Deletes all inquiries
    console.log(result);

    if (result.deletedCount === 0) {
      return next(new AppError("No inquiries to delete", 400));
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} inquiries deleted successfully`,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export { addInquiry, getInquiry, deleteInquiry, deleteAllInquiries };
