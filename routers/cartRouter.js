import express from "express"
import{addToCart,uPDateCart,gitUserCart}from "../controllers/cartController.js"
import authUser from "../middleware/auth.js"

const cartRouter=express.Router()

cartRouter.post('/add',authUser, addToCart)
cartRouter.put('/update',authUser,uPDateCart)
cartRouter.get('/get',authUser,gitUserCart)

export default cartRouter   
