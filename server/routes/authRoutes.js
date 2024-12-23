const express = require("express")
const router = express.Router()
const cors = require('cors')
const passport = require("passport")
const User = require('../models/db')
const OAuth2Strategy = require("passport-google-oauth20").Strategy
const {registerUser,getProfile,loginUser,logOut,verifyMail,NewPassword,PasswordReset,generateToken,getUserProfileData,updateUserProfile,updateUserAddress, getProducts,placeOrder,registerBrand,getOrderDetail,stripeIntegration,sellerDetails,updateStatus,getProductsDetails,addProductReview,getSellerDetails,getAllSellers,updateProductDetails,addNewProduct} = require('../controllers/authControllers')
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)
passport.use(
    new OAuth2Strategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:'/auth/google/callback',
        scope:["profile","email"],
    },
    async(accessToken,refreshToken,profile,cb)=>{
        try {
            let user = await User.findOne({googleID:profile.id})
            if(!user){
                user = new User({
                    FirstName:profile.displayName,
                    googleID:profile.id,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value,
                    verified:true
                })
                await user.save()
            }
            return cb(null,user)
        } catch (error) {
            return cb(null, false)
        }
    }
    )
)
passport.serializeUser((user, cb)=>{
    cb(null,user)
  });
  
passport.deserializeUser((user, cb)=>{
    cb(null,user)
  }); 
//   post
router.post('/register',registerUser)
router.post("/login",loginUser)
router.post('/ResetPassword', PasswordReset)
router.post('/order',placeOrder	)
router.post('/registerBrand',registerBrand)
router.post('/create-checkout-session', stripeIntegration)
router.post('/product-reviews',addProductReview)
router.post('/addnewproduct/:id',addNewProduct)
// patch 
router.patch('/ForgotPassword/:id/:token', NewPassword)
router.patch('/update-user-profile/:id',updateUserProfile)
router.patch('/update-user-address/:id',updateUserAddress)
router.patch('/update-order-status/:id',updateStatus)
router.patch('/update-product/:id',updateProductDetails)
// get 
router.get("/profile",getProfile);
router.get('/logout',logOut)
router.get('/user-profile/:id',getUserProfileData)
router.get('/verify/:id/:expirationTimestamp', verifyMail)
router.get('/products',getProducts)
router.get('/seller/:id',getSellerDetails)
router.get('/sellers',getAllSellers)
router.get('/orderinfo/:id',getOrderDetail)
router.get('/seller-detail/:id',sellerDetails)
router.get('/products/:id',getProductsDetails)
router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: 'http://localhost:3000/google/auth/ValidationFailure' }),
function(req, res) {
    // const {id,FirstName,email} = await User.findOne({googleID:req.user.googleID})   
     
  const token = generateToken(req.user);
  // Set the token as a cookie
  res.cookie('token', token, { maxAge: 3600000, httpOnly: true }); 
  res.redirect('http://localhost:3000')
})
module.exports = router