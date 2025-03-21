import mongoose from 'mongoose';
import Product from '../model/product.model.js'

//Get Products
export const getProducts = async(req, res)=>{
    try {
        const products = await Product.find({});
        // console.log(products)
        res.status(200).json({
            success: true,
            message: "Get Products successfully",
            data : products
        })
        
        
    } catch (error) {
        console.log("Error in Get Products:", error);
        res.status(500).json({
            success: false,
            message:'Server Err'
        })
    }
};

//Create Product
export const createProduct = async (req,res)=>{ 
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({
            success : false,
            message: 'Please Provide all fields'
        });
    }

    const newProdcut = new Product(product);

    try{
        await newProdcut.save();
        res.status(201).json({
            success: true,
            message:'Product added successfully',
            data: newProdcut
        });
    } catch (error) {
        console.log("Error in Create Product:", error);
        res.status(500).json({
            success: false,
            message:'Server Err'
        })
    }
};

//Update Product
export const updatedProduct = async(req, res)=>{
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success: false,
            message:"Product not found"
        })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{
            new:true
        });
        res.status(200).json({
            success: true,
            message:"Product Updated successfully",
            data:updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Server Er"
        })
    }
};

//Delete Produc
export const deleteProduct = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format"
        });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({ 
            success: false,
            message: 'Product not found' });
        }
        res.status(200).json({
            success: true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        console.log("Error in Delete Product:", error);
        res.status(500).json({
            success: false,
            message:'Server Err'
        })
    }
};