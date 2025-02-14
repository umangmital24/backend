//require("dotenv").config({path: './env'});
import dotenv from "dotenv";

//import mongoose from "mongoose";
//import { DB_NAME } from "./constants";
import express from "express";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({ 
  path: "./env"
});

connectDB()
.then(() => {
  app.listen(process.env.PORT|| 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
.catch((error) => {
  console.log("Mongo DB connection failed", error);
 
});

/*
import express from "express";
cont app = express();

(()=>{
    try{
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
              console.log("Error: ",error);
            throw error
       })
         app.listen(process.env.PORT,()=>{
              console.log(`Server is running on port ${process.env.PORT}`);
         })
    }
    catch(error)
    {
        console.error("Error: ",error);
        throw err
    }
})
    
*/