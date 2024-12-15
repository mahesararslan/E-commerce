import { RecentSearches } from "@/components/RecentSearches";
import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }

    try {
        await mongooseConnect();
        
        const user = await User.findOne({
            email: session.user.email,
        });


        if (!user) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }

        return NextResponse.json({
            status: 200,
            wishlist: user.wishlist,
            cart: user.cart,
            recentSearches: user.recentSearches
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
        });
    }
}
