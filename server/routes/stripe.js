const express= require("express")
const router = express.Router()
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51OT909JvFBCqm5cO3mOWVLKvR5cdT6eDnK05rYu0tGuuwfNa6xRHNsa0Mfny4NQPSe2Z0S57SXIqrNISCl7oDJ5M00b178UuU5')
const {stripeIntegration}=require('../controllers/authControllers')
const Order = require('../models/order')
const User = require('../models/db') 
const Product = require('../models/product')
router.post('/create-checkout-session', stripeIntegration)

let endpointSecret;
//endpointSecret = "whsec_cf9560f4ade8241b2cad1751bd0081eaf87c286909945bd81529773dafc5d635";
router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
    let data;
    let eventType;
  if(endpointSecret){
    let event; 

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log('webhook verified')
    } catch (err) {
        console.log(`webhook error:${err.message}`)
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    data = event.data.object
    eventType = event.type
}
else{
    data = request.body.data.object
    eventType = request.body.type
}

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
            const user = customer.metadata.user;
            const cart = customer.metadata.cart;
            const total = customer.metadata.total;
            const paymentMethod = customer.metadata.paymentMethod;
            const parsedCart = JSON.parse(cart);
            const newOrder = new Order({
                buyer: user,
                products: parsedCart.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity
                })),
                totalPrice: total,
                status: 'Processing',
                paymentMethod: paymentMethod	
            })
            const data = await newOrder.save()
            await User.updateOne({_id:user},{$push:{orders:data._id}})
            parsedCart.forEach(async (item) => {
              await Product.updateOne(
                  { _id: item.product._id },
                  {
                      $inc: {
                          itemsSold: item.quantity, 
                          quantity: -item.quantity 
                      }
                  }
              );
          });
        })
        .catch(err => console.log(err.message));
}

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});
module.exports = router