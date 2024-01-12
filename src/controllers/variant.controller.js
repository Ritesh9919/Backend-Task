import {Variant} from '../models/variant.model.js';
import { Product } from '../models/product.model.js';
import {ApiError, ApiResponse, asyncHandler} from '../utils/index.js';



const createVariant = asyncHandler(async(req, res)=> {
    const {productId} = req.params;
    if(!productId) {
        throw new ApiError(400, 'Product id is required');
    }

    const product = await Product.findById(productId);
    if(!product) {
        throw new ApiError(404, 'Product does not exist');
    }

    const variant = new Variant(req.body);
    if(!variant) {
        throw new ApiError(404, 'Variant does not exist');
    }

    product.variants.push(variant._id);
    await product.save();
    await variant.save()

    return res.status(201)
    .json(new ApiResponse(200, variant, 'Product variant created successfully'));
})


const updateVariant = asyncHandler(async(req, res)=> {
    const {variantId} = req.params;

    if(!variantId) {
        throw new ApiError(400, 'Variant id is required');
    }

    

    const variant = await Variant.findById(variantId);
    if(!variant) {
        throw new ApiError(404, 'Variant does not exist');
    }

    const updatedVariant = await Variant.findByIdAndUpdate(
        variantId,
        req.body,
        {new:true}
    )

    return res.status(200)
    .json(new ApiResponse(200, updatedVariant, 'Variant updated successfully'));
})




const deleteVariant = asyncHandler(async(req, res)=> {
    const {productId} = req.params;
    const {variantId} = req.params;

    if(!productId || !variantId) {
        throw new ApiError(400, 'Product id and Variant id is required');
    }

    const product = await Product.findById(productId);
    if(!product) {
        throw new ApiError(404, 'Product does not exist');
    }

    const variant = await Variant.findById(variantId);
    if(!variant) {
        throw new ApiError(404, 'Variant does not exist');
    }

    const deletedVariant = await Variant.findByIdAndDelete(
        variantId,
        {new:true}
    )

    product.variants.pull(variant._id);
    await product.save();

    return res.status(200)
    .json(new ApiResponse(200, deletedVariant, 'Variant deleted successfully'));
})




export {
    createVariant,
    updateVariant,
    deleteVariant
}