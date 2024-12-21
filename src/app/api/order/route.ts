import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) { 
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }

    try {
        const { address, city, country, name, paymentMethod, phoneNumber, postalCode, cart, total } = await req.json();
        console.log("REQ Recieved");
        
        await mongooseConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }
        // @ts-ignore // update the user's cart
        const order = await Order.create({
            userId: user._id,
            products: cart,
            totalAmount: total,
            paymentMethod,
            shippingAddress: address,
            country,
            city,
            postalCode,
            phoneNumber,
            recieverName: name,
        });

        // clear the user's cart
        const updatedUser = await User.findOneAndUpdate({
            email: session.user.email,
        }, {
            cart: [],
        }, {
            new: true,
        });
        console.log("ORDER: ",order);

        return NextResponse.json({
            order,
        }, {
            status: 200,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
        });
    }
}
