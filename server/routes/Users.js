const express=require('express');
const router=express.Router();
const {Users}=require('../models');
const bcrypt=require('bcrypt');
const {sign}=require('jsonwebtoken');
const {validateToken}=require('../middleware/AuthMiddleWare');


router.post("/",async (req,res)=>{
      const {username,password,email}=req.body;
      bcrypt.hash(password,10).then((hash)=>{
          Users.create({
              username:username,
              password:hash,
              email:email
          });
          res.json("Success");
      });
      
});

router.post("/login",async(req,res)=>{
      const {username,password}=req.body;
      console.log(username,password);

      const user=await Users.findOne({where:{username:username}});

      if(!user) {res.json({error:"wrong username or user does not exist"});}

      bcrypt.compare(password,user.password).then((match)=>{
        if(!match) {res.json({error:"wrong password"});}
        
        const accessToken=sign({username:user.username,id:user.id},"secret");

        res.json({accessToken:accessToken,username:username,id:user.id});
      });
});

router.get("/auth",validateToken,(req,res)=>{
   
   res.json(req.user);
});



module.exports=router;