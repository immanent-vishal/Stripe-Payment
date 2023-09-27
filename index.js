const express = require("express");
require("dotenv").config();
const  cors =  require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const stripe = require("stripe")(
  "sk_test_51Nq6nmSC2MKQ5asjr7P3LreWaGyuf92YSJ2dO1b95YrujmZnPB3JqvA0WIJ6AvrAqsyof4wBVmBXe6cyT4XjPmdT00iNZDbsEj"
);
// Tax rate ID from Stripe dashboard

app.post("/create-checkout-session", async (req, res) => {


  console.log("start");
  const taxRateId = "txr_1Nuu4uSC2MKQ5asjD1meJ8Ix";
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: `price_1Nus5lSC2MKQ5asjamadkIwz`, 
          quantity: 1,
          tax_rates: [taxRateId], // Tax rate ko yahan add karein
        },
      ],
      mode: "payment",
      success_url: `http://10.1.2.45:${PORT}/success`,
      cancel_url: `http://10.1.2.45:${PORT}/cancel`,
    
    
    });

    console.log("Received payment");
    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});



app.get('/success' , (req,res)=>{

   res.send("succcess")

})
app.get('/cancel' , (req,res)=>{

    console.log("success");

})
app.listen(PORT, (error) => {
  if (error) {
    console.error("Server error:", error);
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
