import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    variants:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Variant'
        }
    ]

},{timestamps:true});


export const Product = mongoose.model('Product', productSchema);