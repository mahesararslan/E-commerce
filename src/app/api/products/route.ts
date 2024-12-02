import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await mongooseConnect();

        const products = await Product.find({});
        
        return NextResponse.json({
            status: 200,
            products
        })
    }
    catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({
            status: 500,
            message: "Error connecting to MongoDB"
        });
    }
}