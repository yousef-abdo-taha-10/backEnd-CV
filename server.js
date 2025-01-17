import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routers/userrouter.js'
import productRouter from './routers/productRouter.js'



// app config 
const app=express()
const port=process.env.PORT||4000

connectDB()
connectCloudinary()
// middeleware 
app.use(express.json())
app.use(cors())

// api endpoints 
app.use('/api/user',userRouter)
app.use('/api/proudct',productRouter)


app.get('/',(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>console.log('server is running on port:'+port))