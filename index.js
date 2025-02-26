const express = require('express');
const MenuItem = require('./schema');
const mongoose=require('mongoose')
require('dotenv').config()
const app = express();
const port = 3011 
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      console.log("connected to the database")
    })
    .catch((err)=>{
      console.log(err)
      console.log("error connecting to the database")
    })
// app.use(express.static('static'));
app.post('/', async (req, res) => {
  try{
    if(!req.body.name||!req.body.price){
      res.status(400).json({message:"name and price are required"})
    }
    else {
    const {name,description,price}=req.body
    const newMenuItem= new MenuItem({
      name,description,price
    
    })
    await newMenuItem.save()
    res.status(200).json({message: "item added successfully"})
    }
  } catch(err){
    res.status(400).json({message:"error adding item"})

  }
})
app.get('/',async(req,res)=>{
  try{
    const menuItems=await MenuItem.find()
    res.status(200).json({data:menuItems})
  }
  catch(err){
    res.status(400).json({message:"error fetching items"
    })
  }
})

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});