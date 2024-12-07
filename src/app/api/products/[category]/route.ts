import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

// get products of a specific category.
export async function GET_category(req: NextRequest) {
    console.log("GET_category");
    try {
        await mongooseConnect();

        const url = new URL(req.url);
        const category = url.searchParams.get('category');
        console.log("Category: ", category);
        

        const products = await Product.find({ category });
        console.log("Products: ", products);
        return NextResponse.json({
            status: 200,
            products
        })
    }
    catch (e) {
        console.error("Error: ", e);
        return NextResponse.json({
            status: 500,
            message: "Error connecting to MongoDB"
        });
    }
}