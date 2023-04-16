const express=require("express");
const cors=require("cors");
const dbconfig=require("./db");
const app=express();

const userRoute= require("./routes/usersRoute");
const dataRoute=require("./routes/dataRoute");

app.use(cors());
app.use(express.json());
app.use('/users',userRoute);
app.use('/data',dataRoute);

app.get('/',(req,res)=>{
    res.send(`I'm ON...`); 
})
  
app.listen(5000);