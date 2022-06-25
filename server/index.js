const express=require('express');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());
const db=require('./models');

const boardRouter=require('./routes/Boards');
app.use("/boards",boardRouter);

const todosRouter=require('./routes/Todos');
app.use("/todos",todosRouter);

const itemsRouter=require('./routes/Items');
app.use("/items",itemsRouter);

const eventsRouter=require('./routes/Events');
app.use("/events",eventsRouter);

const usersRouter=require('./routes/Users');
app.use("/auth",usersRouter);



db.sequelize.sync().then(()=>{
    app.listen(3001,()=>console.log("server running on port 3001"));
});