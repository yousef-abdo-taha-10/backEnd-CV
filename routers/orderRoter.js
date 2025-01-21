import express from "express"
import { allOrder, placeOrder, placeOrderStripe, updateStatus, userOrder, verifyStripe } from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"
const orderRouter= express.Router()

// for admin 
orderRouter.post('/list', adminAuth, allOrder)
orderRouter.post('/status',adminAuth,updateStatus)

// for payment
orderRouter.post('/place', authUser,  placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)

// verify payment
orderRouter.post('/verifystripe', authUser, verifyStripe)

// for User 
orderRouter.post('/userorders',authUser, userOrder)


export  default orderRouter