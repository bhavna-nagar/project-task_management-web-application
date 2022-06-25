const express=require('express');
const router=express.Router();
const {Events}=require('../models');

router.get("/",async (req,res)=>{
      const listOfEvents=await Events.findAll();
      res.json(listOfEvents);
});

router.get("/user/:id",async (req,res)=>{
      const id=req.params.id;
      const events=await Events.findAll({ where: { UserId: id } });
      res.json(events);
});


router.post("/",async (req,res)=>{
      const event=req.body;
     await Events.create(event);
     res.json(event);
});

module.exports=router;