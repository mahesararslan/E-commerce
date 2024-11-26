import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/schemas";
import { User } from "@/models/user";

export default async function POST(req: NextRequest) {

    const { firstName, lastName, email, password } = await req.json();
    const { success } = signUpSchema.safeParse({ firstName, lastName, email, password });

    if (!success) {
        return new NextResponse("Invalid input", { status: 400 });
    }

    try {
        const response = await User.create({
            firstName,
            lastName,
            email,
            password,
        })

        return new NextResponse("Signed up successfully", { status: 200 });
    }
    catch (error) {
        return new NextResponse("Failed to sign up", { status: 500 });
    }
}