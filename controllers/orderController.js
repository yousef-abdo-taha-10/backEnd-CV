import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

// Global variables for payment
const currency="pkr"
const deliveryCharges=10


// stripe Gateway initialization 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Controller function for placing order  using cod method

const placeOrder = async (req,res)=>{

    try{
    const {userId,items ,amount,address}=req.body

    const orderData={
        userId,
        items,
        amount,
        address,
        paymentMethod:"COD",
        paymet:false,
        date:Date.now()
    }
    const newOrder= new orderModel(orderData)
    await newOrder.save()
    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({success:true,message:"Order placed"})
    }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})

    }

}

// Controller function for placing order  using Stripe method

const placeOrderStripe = async (req,res)=>{
    try{
        const {userId,items ,amount,address}=req.body
        const {origin}=req.headers
    const orderData={
        userId,
        items,
        amount,
        address,
        paymentMethod:"COD",
        paymet:false,
        date:Date.now()
    }
     const newOrder=new orderModel(orderData)
     await newOrder.save()

     const line_items=items.map((item)=>({
        price_data:{
            currency:currency,
            product_data :{
                name:item.name
            },
            unit_amount:item.price *100* 3.67     //  converting into pkr currency  
            
        },
      quantity:item.quantity
     }))
     line_items.push({
        price_data:{
            currency:currency,
            product_data :{
                name:'Delivery charges'
            },
            unit_amount:deliveryCharges *100*3.67    //  converting into pkr currency  
            
        },
        quantity:1
     })
     const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/varify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/varify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
     })
     res.json({success:true,session_url:session.url})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
     
    }

}

// Controller function for all orders  data for Admin panel

const allOrder = async (req,res)=>{

      
    try{
        const orders=await orderModel.find({})
        res.json({success:true,orders})



    }catch(error){
     console.log(error)
     res.json({success:false,message:error.message})
    }

}

// Controller function for getting order for frontend

const userOrder = async (req,res)=>{

    
    try{
    const {userId}=req.body
    const orders=await orderModel.find({userId})
    res.json({success:true,orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
// Controller function for upating order status for admin panel

const updateStatus = async (req,res)=>{
    try{
     const {orderId,Status}=req.body
     await orderModel.findByIdAndUpdate(orderId,{Status})
     res.json({success:true,message:"Status Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
// Controller function for verify stripe(A temporary method for testing purpose only)

const verifyStripe = async (req,res)=>{

    
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{caretData:{}})
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})

        }

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
         
    }

}

export{placeOrder,placeOrderStripe,allOrder,userOrder,updateStatus,verifyStripe}


