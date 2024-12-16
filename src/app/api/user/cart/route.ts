import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
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
        const { productId, quantity } = await req.json();
        console.log(productId, quantity);
        console.log("PRODUCT ID: ", productId);
        await mongooseConnect();
        // @ts-ignore // update the user's cart
        const user = await User.findOneAndUpdate( // @ts-ignore
            { email: session.user.email },
            { $addToSet: { cart: { productId, quantity } } },
            { new: true }
        );

        console.log(user);

        if (!user) {
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }

        console.log("CART: ",user.cart);

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

// update the quantity of a product in the user's cart
export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }

    try {
        const { productId, quantity } = await req.json();
        console.log("QUANTITY: ", quantity);

        await mongooseConnect();
        // @ts-ignore // update the user's cart
        const user = await User.findOneAndUpdate(
            { 
                email: session.user.email, 
                "cart.productId": productId // Match specific product in cart
            },
            { 
                $set: { "cart.$.quantity": quantity } // Update quantity of the matched cart item
            },
            { 
                new: true // Return the updated user document
            }
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

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }

    try {

        await mongooseConnect();
        // @ts-ignore // update the user's cart
        const user = await User.findOneAndUpdate( // @ts-ignore
            { email: session.user.email },
            { cart: [] },
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

