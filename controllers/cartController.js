import userModel from '../models/userModel.js'

//  controller function for add product  to cart 

const addToCart= async (req,res)=>{
    try{
      const {userId,itemId,size}=req.body

       const userDate= await userModel.findById(userId)
       const cartDate = await userDate.cartDate
       if(cartDate[itemId]) {
        if(cartDate[itemId][size]){
            cartDate[itemId][size]+=1
        }
        else{
            cartDate[itemId][size]=1
        }

       }else{
        cartDate[itemId]={}
        cartDate[itemId][size]=1
       }
       await userModel.findByIdAndUpdate(userId,{cartDate})
       res.json({success:true,message:"Added to cart"})
    }catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
    }
}

//  controller function for upDate  cart 

const uPDateCart= async (req,res)=>{
    try{
    const {userId,size,itemId,quantity}=req.body
    const userDate= await userModel.findById(userId)
    const cartDate=await userDate.cartDate

    cartDate[itemId][size]=quantity

    await userModel.findByIdAndUpdate(userId,{cartDate})
    res.json({success:true,message:"Cart Updated"})
    }catch(error){
        console.log(error)
      res.json({success:false,message:error.message})
    }
}

//  controller function for getting user cart 

const gitUserCart= async (req,res)=>{
    try{
     const {userId}=req.body
     const userDate=await userModel.findById(userId)
     const cartDate= await userDate.cartDate
     res.json({success:true,cartDate})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export {addToCart,uPDateCart,gitUserCart}

