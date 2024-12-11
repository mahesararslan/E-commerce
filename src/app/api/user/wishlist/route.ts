import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }

    console.log(session?.user);

    try {
        const { productId } = await req.json();

        await mongooseConnect();
        // @ts-ignore // update the user's wishlist
        const user = await User.findOneAndUpdate( // @ts-ignore
            { email: session.user.email },
            { $addToSet: { wishlist: productId } },
            { new: true }
        );

        console.log(user);

        if (!user) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }

        return NextResponse.json({
            status: 200,
            wishlist: user.wishlist,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
        });
    }
}

