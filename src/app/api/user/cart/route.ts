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
        const { productId } = await req.json();

        await mongooseConnect();
        // @ts-ignore // update the user's cart
        const user = await User.findOneAndUpdate( // @ts-ignore
            { email: session.user.email },
            { $addToSet: { cart: productId } },
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

        await mongooseConnect();
        // @ts-ignore // update the user's cart
        const user = await User.findOneAndUpdate( // @ts-ignore
            { email: session.user.email, cart: productId },
            { $set: { "cart.$": quantity } },
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

