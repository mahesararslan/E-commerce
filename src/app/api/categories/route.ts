import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        await mongooseConnect();

        const categories = await Category.find({});
        
        return NextResponse.json({
            status: 200,
            categories
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