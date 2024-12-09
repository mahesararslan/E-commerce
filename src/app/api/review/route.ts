import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
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

    try {
        await mongooseConnect();

        const { productId, userName, rating, review } = await req.json();

        if (!productId || !rating || !review) {
            return NextResponse.json({
                status: 400,
                message: "Please provide all the required fields",
            });
        }

        // Add the new review and return the updated document
        const product = await Product.findOneAndUpdate(
            { _id: productId },
            {
                $push: {
                    reviews: { userName, rating, review, createdAt: new Date() },
                },
            }
        );

        console.log("Product: ", product);


        // update average rating
        
        

        if (!product) {
            return NextResponse.json({
                status: 403,
                message: "Product not found",
            });
        }

        // @ts-ignore


        // Update the average rating in the product
        const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        product.rating = totalRating / product.reviews.length;
        await product.save();

        return NextResponse.json({
            status: 200,
            message: "Review added successfully",
            reviews: product.reviews, // Updated reviews array
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
        });
    }
}
