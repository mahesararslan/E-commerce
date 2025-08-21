import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { OTP } from "@/models/otp";
import { mongooseConnect } from "@/lib/mongoose";

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

export async function POST(request: Request) {
  try {
    await mongooseConnect();
    const { email } = await request.json();
    console.log("Request Received for email sending:", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check environment variables
    if (!user || !pass) {
      console.error("Email credentials not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // check if an otp has already been generated for the email
    const existingOtp = await OTP.findOne({ email });
    if (existingOtp) {
      console.log("Deleting existing OTP for:", email);
      await OTP.deleteOne({ email });
      console.log("Existing OTP deleted successfully");
    }

    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    
    console.log("Generated OTP:", otp, "Expiry:", otpExpiry);

    // Save the OTP in the database
    try {
      const response = await OTP.create({
        email,
        otp,
        expiry: otpExpiry,
      });
      console.log("OTP saved to database successfully");
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Create transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: "zoho",
        host: "smtpro.zoho.in",
        port: 465,
        secure: true,
        auth: {
          user,
          pass,
        },
      });
      console.log("Email transporter created successfully");
    } catch (transporterError) {
      console.error("Transporter creation error:", transporterError);
      return NextResponse.json({ error: "Email service configuration error" }, { status: 500 });
    }

    const mailOptions = {
      from: "device-haven@zohomail.com",
      to: email,
      subject: "OTP for account verification",
      html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", email);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json(
      { 
        message: "Message sent successfully",
        otp: otp, // Remove this in production for security
        expiry: otpExpiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("General error in send-otp:", error);
    return NextResponse.json( 
      { error: "Failed to send message", details: error },
      { status: 500 }
    );
  }
}