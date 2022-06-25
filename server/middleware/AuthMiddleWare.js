const {verify}=require('jsonwebtoken');


const validateToken=(req,res,next)=>{
    const accessToken=req.header("accessToken");

    if(!accessToken){res.json({error:"User not logged in!!"});}

    try{
        const validToken=verify(accessToken,"secret");
        req.user=validToken;
        if(validToken){next();}
    
    }catch(err){
        res.json({error:err});
    }
}

module.exports={validateToken}