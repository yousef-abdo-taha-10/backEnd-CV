import jwt from 'jsonwebtoken'


const adminAuth =async (req,res,next)=>{
    try{
    const {token} =req.headers
    if (!token){
        return res.json({success:false,message:"Not Authorized please LOGIN again "})
    }
    const token_decode =jwt.verify(token,process.env.JWT_SECRET)
    if(token_decode!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
        return res.json({success:false,message:"Not Authorized please Login again"})
    }
    next()
        

    }catch(error){
     console.log(error)
     res.json({success:false,message:error.message})
    }
}

export default adminAuth 