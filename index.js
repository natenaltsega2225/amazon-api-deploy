// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// dotenv.config();

// const app = express();

// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.status(200).json({
//         message: "Success!"
//     });
// });

// app.post("/payment/create", async (req, res) => {
//     const total = parseInt(req.query.total);
//     if (total > 0) {
//         try {
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: total,
//                 currency: "usd",
//             });

//             res.status(201).json({
//                 clientSecret: paymentIntent.client_secret,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: error.message,
//             });
//         }
//     } else {
//         res.status(403).json({
//             message: "Total must be greater than 0",
//         });
//     }
// });

// // Start the server on port 5001
// app.listen(5001, (err) => {
//     if (err) throw err;
//     console.log("Server running on PORT: 5001, http://localhost:5001");
// });

//============//
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_KEY);

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Success!"
    });
});

app.post("/payment/create", async (req, res) => {
    const total = parseInt(req.query.total);
    if (total > 0) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "usd",
            });

            res.status(201).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    } else {
        res.status(403).json({
            message: "Total must be greater than 0",
        });
    }
});

// Start the server using dynamic port for Render
const PORT = process.env.PORT || 5001;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on PORT: ${PORT}`);
});
