const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer=require('nodemailer')
const passport = require("passport")
const User = require('../models/db')
const Brand = require('../models/brand')
const Order = require('../models/order')
const Product = require('../models/product')
const Review = require('../models/review')
const Category = require('../models/category')
const OAuth2Strategy = require("passport-google-oauth20").Strategy
const findOrCreate = require("mongoose-findorcreate")
const { Schema } = require('mongoose')
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51OT909JvFBCqm5cO3mOWVLKvR5cdT6eDnK05rYu0tGuuwfNa6xRHNsa0Mfny4NQPSe2Z0S57SXIqrNISCl7oDJ5M00b178UuU5')
// const email_existence = require('email-existence') 

const createBrand = async (req, res) => {
    const id = '663813e6f423a77101974981'
    const newBrand = new Brand({
        name: 'nike',
        email: 'needaspeed639@gmail.com',
        phoneNumber: '0334382323',
        isActive: true
      });
        try {
            const data = await newBrand.save();
            const user = await User.updateOne({_id:id},{brand:data._id})
        } catch (error) {
            console.error('Error creating brand:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
}
const createProduct = async (req, res) => {
   try
    {
    const id = '663e93ceddd824bd6999a316'
    const newProduct1 = new Product({
        name: 'Air Max',
        images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfbv-C4Oy91TefTMDzO7bjDnpe8XozkteFdsouRLXSfA&s'],
        description: 'SpaceX Zoom Pegasus Rocket',
        quantity: 4,
        price: 599,
        discount: 0,
        isActive: true,
        brand: id
    })
    await newProduct1.save()
    console.log('Products created successfully');
}
catch(err){
    console.log(err)
}
}

const createOrder = async (req, res) => {
    try {
        const userid='6636b653eba042620bcbd619'
        const products=[{
            product: '663f4711abbaf104f1d16335',
            quantity: 1
        },
        {
            product: '663f47db42941de439425370',
            quantity: 2
        }
    ]
        const newOrder = new Order({
            buyer: userid,
            products: products,
            totalPrice: 100,
            status: 'Pending'
        })
       const data= await newOrder.save()
       await User.updateOne({_id:userid},{$push:{orders:data._id}})
       console.log('çreated succesfully')

    } catch (error) {
        console.log(error)
    }
}
/////

const sendVerifyEmail = async (name, email, id) => {
    try {
        // Configure the transporter with basic SMTP settings
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports like 587
            auth: {
                user: process.env.USEREMAIL, // Your SMTP user (email address)
                pass: process.env.USERPASS  // Your SMTP password or app-specific password
            }
        });

        // Verify transporter
        await transporter.verify();

        // Prepare email content
        const expirationTimestamp = Math.floor(new Date().getTime() / 1000);
        const mailOptions = {
            from: process.env.USEREMAIL, // Your verified sender email
            to: email,
            subject: 'Email Verification',
            html: `<div style="font-family: Arial, sans-serif; margin: 0 auto; max-width: 600px; padding: 20px;">
            <h2 style="color: #333;">Hi ${name},</h2>
            <p style="color: #555;">Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://web-project-funoon.vercel.app/verify/${id}/${expirationTimestamp}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
            </div>
            </div>`
        };

        // Send email and await completion
        const info = await transporter.sendMail(mailOptions);

        // Log success
        console.log('EMAIL SENT ', email, info.response);
    } catch (error) {
        // Handle errors
        console.error('Error sending verification email:', error.message);
    }
};

const verifyMail = async (req, res) => {
    const { id, expirationTimestamp } = req.params;
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const expirationTime = 60; // 60 seconds
    try {
        if ((parseInt(currentTimestamp) - parseInt(expirationTimestamp) <= parseInt(expirationTime))) {
            const data  = await User.updateOne({_id:id},{verified:true});
            if(data){
                res.json({success:'Email verified'})
            }
        }
    }
        catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
const registerUser = async (req, res) => {
    const { FirstName, LastName, email, password,phoneNo } = req.body;
    if(password.length < 6){
        return res.json({
            error:'Password is required and must be 6 characters long'
        })
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            FirstName:FirstName,
            LastName:LastName,
            email:email,
            password: hashedPassword,
            phoneNo:phoneNo,
            verified:true,
        });
        res.json(user);
    } catch (e) {
        res.json({ error: e });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });

        if (!userDoc || !userDoc.verified || !userDoc.password) {
            return res.json({ error: 'User not found' });
        }

        const passOk = await bcrypt.compare(password, userDoc.password);
        if (!passOk) {
            return res.json({ error: 'Incorrect Email or Password' });
        }

        // const orderData = {
        //     Status: 'Shipped',
        //     Price: 100,
        //     Date: new Date(),
        //     Time: new Date().toLocaleTimeString()
        // };
        // userDoc.orders.push(orderData);
        // await userDoc.save();
        
        jwt.sign({
            FirstName: userDoc.FirstName,
            email: userDoc.email,
            id: userDoc._id,
            isSeller:userDoc.isSeller
        }, process.env.JWT_SECRET,{expiresIn:'1d'}, (err, token) => {
            if (err) {
                console.error('Error signing JWT:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            
            res.json({ success: 'Successfully Login',token, user: userDoc });
        });
    } catch (error) {
        console.error('Error in loginUser: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProfile= async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      if(userData.isSeller){
        const {FirstName,email,_id,address,isSeller,image,phoneNo,brand} = await User.findById(userData.id).populate(
            {
                path:'brand',
                select:'name image'
            }
        );
        res.json({FirstName,email,_id,address,isSeller,image,phoneNo,brand});
      }
      else{
        const {FirstName,email,_id,address,isSeller,image,phoneNo,brand} = await  User.findById(userData.id).populate(
            {
                path:'brand',
                select:'name image'
            }
        );
        res.json({FirstName,email,_id,address,isSeller,image,phoneNo,brand});
      }
      
      
    });
  } else {
    res.json(null);
  }
}
const logOut =(req,res) =>{
    // issue here
    res.cookie('token', '').json({success:"Logged Out"});
    res.clearCookie('connect.sid',{path:'/'})
    return res.json({Status:"Success"})
}
const PasswordReset = async (req, res) => {
    const { email } = req.body
    try {
        const data = await User.findOne({email})
        if(data){
            const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: 100 })
            emailNewPass(data._id,token,email)
            return res.json({success:'An email has been sent'})
        }
        else{
            return res.json({
                            error: 'Email doesnt exists!'
                        })
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const emailNewPass = async (id,token,email) =>{
    url = `https://web-project-funoon.vercel.app/ForgotPassword/${id}/${token}`
            try {
                const transporter = nodemailer.createTransport({
                    service:"gmail",
                    auth: {
                        user: 'needaspeed639@gmail.com',
                        pass: 'qsws dzzd gokz uytu',
                    },
                });
                const mailOptions = {
                    from: 'needaspeed639@gmail.com',
                    to: email,
                    subject: 'Password Reset',
                    html: ` <div style="font-family: Arial, sans-serif; margin: 0 auto; max-width: 600px; padding: 20px;">
                    <p style="color: #333;">Please click the link below to reset your password:</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="${url}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
                    </div>
                </div>`,
                };
                
                const data = await transporter.sendMail(mailOptions);
                console.log('EMAIL SENT ', email, data.response);
        }
            catch (error) {
                console.error('Error sending verification email:', error.message);
            }
}
const NewPassword = (req, res) => {
    const { id, token } = req.params
    const { password } = req.body
    try
    {jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.json({
                    error: 'Session Expired'

                })
            }
            else {
                if (password.length < 6) {
                    return res.json({
                        error: 'Password is required and must be 6 characters long'
                    })
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    const data  = await User.updateOne({_id:id},{password:hashedPassword});
                    if(data){
                        res.json({success:'Password Updated'})
                    }
                }
            }
        }
    )
    }
    catch(err){
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function generateToken(user){
    return jwt.sign({ FirstName:user.FirstName,email:user.email,id: user._id,isSeller:user.isSeller }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
const getUserProfileData = async (req,res)=>{
    const {id}=req.params
    try {
        const user = await User.findById(id).populate({
            path: 'orders',
            select: '_id totalPrice status placedAt', // Include _id which is orderId
        });
        const userProfileData = {
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email,
            address: user.address,
            googleID: user.googleID,
            phoneNo: user.phoneNo,
            image:user.image,
            orders: user.orders.map(order => ({
                orderId: order._id, 
                totalPrice: order.totalPrice,
                status: order.status,
                placedAt: order.placedAt,
            }))
        };

        res.json(userProfileData);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { data,phoneNo,imageUrl } = req.body;
    const { FirstName, LastName, newPassword, confirmPassword } = data;
    try {
        if (!!newPassword) {
            if (newPassword === confirmPassword && newPassword.length >= 6) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                await User.updateMany({ "_id": id }, { "$set": { "FirstName": FirstName, "LastName": LastName, "password": hashedPassword,'phoneNo':phoneNo,'image':imageUrl } });
                return res.json({ success: "Changes updated along with password" });
            } else {
                return res.json({ error: "Password doesn't match or must be at least 6 characters long!" });
            }
        } else {
            await User.updateMany({ "_id": id }, { "$set": { "FirstName": FirstName, "LastName": LastName,'phoneNo':phoneNo, 'image':imageUrl} });
            return res.json({ success: "Changes updated" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateUserAddress = async (req,res)=>{
    const {id} = req.params
    const {data} = req.body
    const {shippingAddress,shippingCity,shippingCountry,billingAddress,billingCity,billingCountry} = data
    try {
        await User.updateMany({"_id":id},{"$set":{
            "address.shippingAddress.address":shippingAddress,"address.shippingAddress.city":shippingCity,"address.shippingAddress.country":shippingCountry,
            "address.billingAddress.address":billingAddress,"address.billingAddress.city":billingCity,"address.billingAddress.country":billingCountry
        }})
        return res.json({ success: "Changes updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({isActive:true}).populate(path='brand',select='name')
        res.json(products)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}
const placeOrder = async (req,res)=>{
    const {cart,total,user,paymentMethod} = req.body
    try {
        const newOrder = new Order({
            buyer: user,
            products: cart,
            totalPrice: total,
            status: 'Processing',
            paymentMethod: paymentMethod	
        })
        const data = await newOrder.save()
        await User.updateOne({_id:user},{$push:{orders:data._id}})
        // add the quantity of product in cart to itemssold in product schema and decrease the quantity in product schema
        cart.forEach(async (item) => {
            await Product.updateOne(
                { _id: item.product },
                {
                    $inc: {
                        itemsSold: item.quantity, 
                        quantity: -item.quantity 
                    }
                }
            );
        });
        return res.json({ success: "Order Placed Successfully" ,orderId:data._id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    
}
const registerBrand = async (req, res) => {
    // no password
    const {data,phoneNo,userid,urlImage} = req.body;
    const { name, email,description } = data;
    // create a new brand
    const newBrand = new Brand({
        name: name,
        email: email,
        image: urlImage,
        description: description,
        phoneNumber: phoneNo,
        isActive: true
    });
    try {
        const data = await newBrand.save()
        // reference of seller in user schema and set isSeller to true
        await User.updateOne({_id:userid},{brand:data._id,isSeller:true})
        return res.json({ success: "Brand Successfully Created" });
    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).send({ error: error });
    }
}
const getOrderDetail = async (req,res)=>{
    const {id} = req.params
    try {
        const order = await Order.findById(id).populate({
            path: 'products.product',
            select: 'name price images discount'
        }).populate({
            path: 'buyer',
            select: 'FirstName email phoneNo address'
        });
        res.json(order)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getSellerDetails = async (req,res)=>{
    const {id} = req.params
    try {
        // Find products by brand ID and populate the brand details
        const products = await Product.find({ brand: id }).populate({
          path: 'brand',
        });
        
        if (!products || products.length === 0) {
            const brand = await Brand.findById(id);
          return res.json(brand);
        }
        const brand = products[0].brand;
        const reviews = await Review.find({ product: { $in: products.map(p => p._id) } }).populate(
            {
                path:'user',
                select:'FirstName image'
            }
        ).sort({ rating: -1 });
        brand.reviews = reviews;
        // Since all products should have the same brand, we can take the brand from the first product
    
    
        // Respond with the brand details and all products
        res.json({ reviews: brand.reviews, products });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}
const getAllSellers = async (req,res)=>{
    try {
        const sellers = await User.find({isSeller:true}).populate({
            path: 'brand',
            select: 'name image description'
        });
        res.json(sellers)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }}
const stripeIntegration = async (req, res) => {
    const {cart,total,user,paymentMethod} = req.body
    const newCart = cart.map(item => {
        return {
           product:
           { _id: item.product._id},
            quantity: item.quantity
        };
    });
    const customer = await stripe.customers.create({
        metadata:{
            user:user,
            cart:JSON.stringify(newCart),
            total:total,
            paymentMethod:paymentMethod
        }
    })
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'PKR',
                product_data: {
                    name: 'Total Amount', // You can customize this if needed
                },
                unit_amount: total * 100, // Total amount in cents
            },
            quantity: 1, // Quantity should be 1 for total amount
        }],
        customer: customer.id,
        mode: 'payment',
        success_url: 'https://web-project-funoon.vercel.app/checkout-success',
        cancel_url: 'https://web-project-funoon.vercel.app/shoppingcart',
    });
  res.send({url:session.url});
}
const sellerDetails = async (req,res)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id).populate('brand')
        //use this to find orders made to brand
        // $lookup: Joins the products collection to the Order documents to get full product details for each order.
        // $match: Filters the orders to include only those where at least one product's brand matches the given brandId.
        // $project: Projects the necessary fields and filters the productDetails to include only products that match the brandId.
        // $lookup: Joins the users collection to get buyer details.
        // $unwind: Ensures that the buyer details are returned as a single object instead of an array.

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $match: {
                    'productDetails.brand': user.brand._id
                }
            },
            {
                $project: {
                    buyer: 1,
                    products: 1,
                    totalPrice: 1,
                    paymentMethod: 1,
                    placedAt: 1,
                    status: 1,
                    productDetails: {
                        $filter: {
                            input: '$productDetails',
                            as: 'product',
                            cond: { $eq: ['$$product.brand', user.brand._id] }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyer',
                    foreignField: '_id',
                    as: 'buyerDetails'
                }
            },
            {
                $unwind: '$buyerDetails'
            }
        ]);
        res.json({orders,brand:user.brand});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateStatus = async (req,res)=>{
    const {id} = req.params
    const {status} = req.body
    try{
        const data = await Order.updateOne({_id:id},{status:status})
        if(data){
         return  res.json({success:'Status Updated'})
        }
    }
    catch(err){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getProductsDetails = async (req,res)=>{
    const {id} = req.params
    try {
        const product = await Product.findById(id).populate('brand')
        const reviews = await Review.find({product:id}).populate(
            {
                path:'user',
                select:'FirstName image'
            }
        
        ).sort({created:-1})
            
        res.json({product,reviews})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const addProductReview = async (req,res) =>{
    const {reviews,id,product,avgRating} = req.body
    try {
        const newReview = new Review({
            user:id,
            product:product,
            review:reviews.review,
            rating:reviews.rating,
            updated:Date.now()
        })
        await newReview.save()
        await Product.updateOne({_id:product},{avgRating:avgRating})
        res.json({success:'Review Added'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateProductDetails = async (req,res) =>{
    const {id} = req.params
    const {isActive,price,quantity,discount}  = req.body
    try {
        const data = await Product.updateOne({_id:id},{isActive:isActive,price:price,quantity:quantity,discount:discount})
        if(data){
            res.json({success:'Product Updated'})
        }
    }
    catch(err){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const addNewProduct = async (req,res)=>{
    const {data} = req.body
    const {id} = req.params
    const {name,description,longDescription,quantity,price,discount,category,isActive,image} = data
    // in product schema
    const newProduct = new Product({
        name:name,
        description:description,
        images:[image],
        quantity:quantity,
        price:price,
        longDescription:longDescription,
        discount:discount,
        category:category,
        brand:id,
        isActive:isActive
    })
    try {
        const data = await newProduct.save()
        res.json({success:'Product Added'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}
module.exports = {registerUser,loginUser,getProfile,logOut,verifyMail,NewPassword,PasswordReset,generateToken,getUserProfileData,updateUserProfile,updateUserAddress,getProducts,placeOrder,registerBrand,getOrderDetail,stripeIntegration,sellerDetails,updateStatus,getProductsDetails,addProductReview, getSellerDetails, getAllSellers,updateProductDetails,addNewProduct}
