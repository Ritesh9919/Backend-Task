import mongoose from "mongoose";


const variantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    SKU:{
        type:String,
        required:true
    },
    additionalCost:{
        type:Number,
        default:0
    },
    stockCount:{
        type:Number,
        default:0

    }

}, {timestamps:true});


export const Variant = mongoose.model('Variant', variantSchema);