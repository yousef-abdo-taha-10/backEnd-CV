import mongoose from "mongoose"

const connectDB= async ()=>{
    try{
     await mongoose.connect(process.env.MONGO_URL)
     console.log("database connected")
    }catch(error){

        console.error("database connection failed",error.massage)

    }
}
export default connectDB 