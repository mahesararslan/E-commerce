import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({
            message: "Unauthorized",
        }, {
            status: 401,
        });
    }

    try {
        await mongooseConnect();
        const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
            }, {
                status: 404,
            });
        }
        
        const orders = await Order.find({
            userId: user._id,
        });

        console.log("Orders of this user: " ,orders);

        return NextResponse.json({
            orders: orders,
        },{
            status: 200,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal server error",
        }, {
            status: 500,
        });
    }
}