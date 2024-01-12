import {Product} from '../models/product.model.js';
import {ApiError, ApiResponse, asyncHandler} from '../utils/index.js';





const createProduct = asyncHandler(async(req, res)=> {
    const {name, description, price} = req.body;
    if(!name || !description || !price) {
        throw new ApiError(400, 'All fields are required');
    }

    const product = await Product.create({name, description, price});

    return res.status(201)
    .json(new ApiResponse(200, product, 'Product created successfully'));
    
})


const getProducts = asyncHandler(async(req, res)=> {
    const {name, description} = req.query;

    const queryObject = {};

    if(name) {
        queryObject.name = {$regex:name, $options:'i'}
    }


    if(description) {
        queryObject.description = {$regex:description, $options:'i'};
    }

    

    const products = await Product.find(queryObject).populate('variants');
    if(!products) {
        throw new ApiError(404, 'Product does not exist');
    }

    return res.status(200)
    .json(new ApiResponse(200, products, 'Products fetched successfully'));
})


const getProduct = asyncHandler(async(req, res)=> {
    const {productId} = req.params;
    if(!productId) {
        throw new ApiError(400, 'Product id is required');
    }

    const product = await Product.findById(productId).populate('variants');
    if(!product) {
        throw new ApiError(404, 'Product does not exist');
    }

    return res.status(200)
    .json(new ApiResponse(200, product, 'Product fetched successfully'));
})

const updateProduct = asyncHandler(async(req, res)=> {
    const {productId} = req.params;
    const {name, description, price} = req.body;
    
    if(!productId) {
        throw new ApiError(400, 'Product id is required');
    }

    const isProductExist = await Product.findById(productId);
    if(!isProductExist) {
        throw new ApiError(404, 'Product does not exist');
    }

    const product = await Product.findByIdAndUpdate(
        productId,
        {$set:{name, description, price}},
        {new:true}
    )

    return res.status(200)
    .json(new ApiResponse(200, product, 'Product updated successfully'));
    
})


const deleteProduct = asyncHandler(async(req, res)=> {
     const {productId} = req.params;
     if(!productId) {
        throw new ApiError(400, 'Product id is required');
     }

     const isProductExist = await Product.findById(productId);
     if(!isProductExist) {
        throw new ApiError(404, 'Product doesn not exist');
     }

     const product = await Product.findByIdAndDelete(
        productId,
        {new:true}
     )

     return res.status(200)
     .json(new ApiResponse(200, product, 'Product deleted successfully'));
})



export {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}

