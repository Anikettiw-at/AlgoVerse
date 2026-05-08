// const express = require('express')
// const app = express();
// require('dotenv').config();
// const main =  require('./config/db')
// const cookieParser =  require('cookie-parser');
// const authRouter = require("./routes/userAuth");
// const redisClient = require('./config/redis');
// const problemRouter = require("./routes/problemCreator");
// const submitRouter = require("./routes/submit")
// const aiRouter = require("./routes/aiChatting")
// const videoRouter = require("./routes/videoCreator");
// const cors = require('cors')

// // console.log("Hello")

// // app.use(cors({
// //     origin: 'http://localhost:5173',
// //     credentials: true 
// // }))
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://frontend-coding-roan.vercel.app/"   
//   ],
//   credentials: true
// }));


// app.use(express.json());
// app.use(cookieParser());

// app.use('/user',authRouter);
// app.use('/problem',problemRouter);
// app.use('/submission',submitRouter);
// app.use('/ai',aiRouter);
// app.use("/video",videoRouter);


// const InitalizeConnection = async ()=>{
//     try{

//         await Promise.all([main(),redisClient.connect()]);
//         console.log("DB Connected");
        
//         app.listen(process.env.PORT, ()=>{
//             console.log("Server listening at port number: "+ process.env.PORT);
//         })
//         const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("Server listening at port number:", PORT);
// });


//     }
//     catch(err){
//         console.log("Error: "+err);
//     }
// }


// InitalizeConnection();
const express = require("express");
const app = express();
require("dotenv").config();

const main = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const authRouter = require("./routes/userAuth");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");
const aiRouter = require("./routes/aiChatting");
const videoRouter = require("./routes/videoCreator");

// Redis
const redisClient = require("./config/redis");

// ================== CORS ==================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-coding-roan.vercel.app",
    ],
    credentials: true,
  })
);

// ================== MIDDLEWARE ==================
app.use(express.json());
app.use(cookieParser());

// ================== ROUTES ==================
app.use("/user", authRouter);
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);
app.use("/ai", aiRouter);
app.use("/video", videoRouter);

// ================== SERVER START ==================
const PORT = process.env.PORT || 5000;

const InitalizeConnection = async () => {
  try {
    // MongoDB
    await main();
    console.log("✅ MongoDB Connected");

    // Redis (safe connect)
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    console.log("✅ Redis Connected");

    app.listen(PORT, () => {
      console.log("🚀 Server listening at port:", PORT);
    });
  } catch (err) {
    console.error("❌ Startup Error:", err.message);
  }
};

InitalizeConnection();
