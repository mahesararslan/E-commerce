import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    }, // 1 image 
    image: {
        type: String,
        required: true,
    },
});

export const Category = models.Category || model("Category", CategorySchema);