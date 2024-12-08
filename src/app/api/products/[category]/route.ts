import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

// get products of a specific category.
export async function GET(request: Request, context: { params: { category: string } }) {
        
        const { category } = await context.params;
    
    console.log("GET_category");
    try {
        await mongooseConnect();
        
        // Find the current category and its subcategories
        const categories = await Category.find({
            $or: [{ _id: category }, { parentCategory: category }],
        });
  
        const categoryIds = categories.map((cat) => cat._id);
  
        // Find products in these categories
        const products = await Product.find({
            category: { $in: categoryIds },
        });

        return NextResponse.json({
            status: 200,
            products
        });
    }
    catch (e) {
        console.error("Error: ", e);
        return NextResponse.json({
            status: 500,
            message: "Error connecting to MongoDB"
        });
    }
}