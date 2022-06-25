const express=require('express');
const router=express.Router();
const {Boards}=require('../models');
const {validateToken}=require('../middleware/AuthMiddleWare');

router.get("/",async (req,res)=>{
      const listOfBoards=await Boards.findAll();
      res.json(listOfBoards);
});

router.get("/byId/:id",async (req,res)=>{
      const id=req.params.id;
      const board=await Boards.findByPk(id);
      res.json(board);
});

router.get("/user/:id",async (req,res)=>{
      const id=req.params.id;
      const boards=await Boards.findAll({ where: { UserId: id } });
      res.json(boards);
});

router.post("/",async (req,res)=>{
      const board=req.body;
     await Boards.create(board);
     res.json(board);
});

module.exports=router;