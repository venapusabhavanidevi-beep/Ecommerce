const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* ---------- MongoDB Connection ---------- */

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

/* ---------- Product Schema ---------- */

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});

const Product = mongoose.model("Product", productSchema);

/* ---------- Home Route ---------- */

app.get("/", (req, res) => {
    res.send("Server Running Successfully");
});

/* ---------- Add Products ---------- */

app.get("/add-products", async (req, res) => {

    try {

        await Product.insertMany([
            {
                name: "Smart Phone",
                price: 15000,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBBZyog4ThE_9OoFsh7thh4LwJTodzDmhTAw&s"
            },
            {
                name: "Laptop",
                price: 50000,
                image: "https://images.jdmagicbox.com/quickquotes/images_main/second-hand-apple-laptop-2222941756-q3g8s1h9.jpg"
            }
        ]);

        res.send("Products Added Successfully");

    } catch (error) {

        console.log(error);

        res.send("Error Adding Products");

    }

});

/* ---------- Get Products ---------- */

app.get("/products", async (req, res) => {

    const products = await Product.find();

    res.json(products);

});

/* ---------- Start Server ---------- */

app.listen(5501, () => {
    console.log("Server Running On Port 5501");
});