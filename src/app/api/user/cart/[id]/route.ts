import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request: Request, context: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }

    try {
        const { id } = await context.params;

        await mongooseConnect();
        
        // find by email and update the cart
        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            { $pull: { cart: id } },
            { new: true }
        );
        

        return NextResponse.json({
            status: 200,
            cart: user.cart,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
        });
    }
}
