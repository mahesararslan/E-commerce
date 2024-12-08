import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } }) {
    // @ts-ignore
    const { id } = await context.params;
    console.log("ID FROM ROUTE: ", id);

    try {
        await mongooseConnect();
        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json({
                status: 404,
                message: "Category not found"
            })
        }

        return NextResponse.json({
            status: 200,
            category
        })
    } catch (e) {
        console.error("Error: ", e);
        return NextResponse.json({
            status: 500,
            message: "Error connecting to MongoDB"
        });
    }
}