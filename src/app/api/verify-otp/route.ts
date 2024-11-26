import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { OTP } from "@/models/otp";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized"
        });
    }

    try {
        mongooseConnect();
        const { email, otp } = await req.json();
        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
        }

        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        if (otpRecord.expiry < new Date()) {
            return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
        }

        if(otpRecord.otp !== otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        
        await OTP.deleteOne({ email, otp });
        await User.updateOne({ email },
            {
                verified: true
            }
        )

        return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
    }
}