import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productmodel.js";


// Controller function for adding a product
const addProduct=async (req,res)=>{ 
    try{
     const {name,description,price,category,subCategory,sizes,popular}=req.body

    //  extracting images if provided
    const image1= req.files?.image1?.[0];
    const image2= req.files?.image2?.[0];
    const image3= req.files?.image3?.[0];
    const image4= req.files?.image4?.[0];

    const images=[image1,image2,image3,image4].filter((item)=>item !==undefined)

    // Upload images to cloudinary or use a default image 
    let imagesUrl;
    if(images.length>0){
        imagesUrl=await Promise.all(
           images.map(async(item)=>{
            const result =await cloudinary.uploader.upload(item.path, {resource_type:"image"}) 
            return result.secure_url
           })
        )    
    }else{
    // Defoult image URL if  no images are provided 
    imagesUrl= ["https://via.placeholder.com/150"]
    }
    
    // Create product date 
    const productDate={
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        popular:popular=="true"?true:false,
        sizes:sizes?JSON.parse(sizes):[],
        image:imagesUrl,
        date:Date.now()
    }
    console.log(productDate)
    
    const product=new productModel(productDate)
    await product.save() 

    res.json({success:true,message:"product Added"})
    }catch(error){
     console,log(error)
     res.json({success:false,message:error.message})
    }
}

// controller function for removing a product

const removeProduct =async(req,res)=>{
    try{

    }catch(error){

    }

}

// conroller function for singel product details
const singleProduct =async (req,res)=>{
    try{

    }catch(error){
         
    }
}
    
// conroller function for  product list
const listProduct =async (req,res)=>{
    try{

    }catch(error){
         
    }
}

export {addProduct,removeProduct,singleProduct,listProduct}

