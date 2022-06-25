const express=require('express');
const router=express.Router();
const {Items}=require('../models');

router.get("/:boardId/:todoId",async (req,res)=>{
       const boardId=req.params.boardId;
       const todoId=req.params.todoId;
       const items=await Items.findAll({where:{BoardId:boardId,TodoId:todoId}});
       res.json(items);
});

router.post("/",async (req,res)=>{
       const item=req.body;
       await Items.create(item);
       res.json(item);
});


module.exports=router;