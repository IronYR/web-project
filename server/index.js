const express = require("express")
require("dotenv").config()
const cors = require('cors')
const app = express()
const session = require("express-session")
const cookieParser = require('cookie-parser')
const passport = require("passport")
const {mongoose} = require ('mongoose')
const stripe = require ("./routes/stripe")
//middleware
const corsOptions ={
    origin: '*', // Allow access from anywhere
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(
    session({
      secret: 'bndhjfbdhbfhdbfhdbfhdbf', // Replace with your own secret key
      resave: false,
      saveUninitialized: false
    })
  );
app.use(passport.initialize())
app.use(passport.session())
app.use('/',require('./routes/authRoutes'))
app.use("/payment",stripe)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Database connected successfully"))
.catch((err)=>console.log("Database not connected",err))

const port = process.env.PORT;
app.listen(port,() => {
console.log("Server is running on port 8000")
})
