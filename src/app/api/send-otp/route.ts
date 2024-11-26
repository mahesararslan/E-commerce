import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { OTP } from "@/models/otp";
import { getServerSession } from "next-auth";

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

export async function POST(request: Request) {

  try {
    const { email } = await request.json();
    console.log("Request Received for email sending");

      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }
  
      // Generate a random 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

        // Save the OTP in the database
        const response = await OTP.create({
          email,
          otp,
          expiry: otpExpiry,
        });
    
    const transporter = nodemailer.createTransport({
      service: "zoho",
      host: "smtpro.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: "device-haven@zohomail.com",
      to: email,
      subject: "New message from your-website",
      html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully",
        otp: response.otp,
        expiry: response.expiry,
       },
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse("Failed to send message.", { status: 500 })
  }
}