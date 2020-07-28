const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const Product = require('../../models/Product')

//@route GET /api/products @desc get all products @access public
router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.log(err);
      return res.status(500).send("System Error");
    }
  });

  //@route Post /api/products @desc add Product @access admin
  router.post("/",[
    check("title", "name is required")
      .not()
      .isEmpty(),
    check("price", "Price is required").not().isEmpty()
  ], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,image,price,availableSizes,description} = req.body;
    try {
        const product = new Product({title,image,price,availableSizes,description});
        await product.save();
        return res.send(product)
    } catch (err) {
        console.log(err);
      return res.status(500).send("System Error");
    }
  })

    //@route Delete /api/products/:id @desc delete Product @access private
    router.delete("/:id",async (req,res)=>{
      try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        return res.send(deletedProduct);
      } catch (err) {
        console.log(err)
      }
    })

  module.exports = router;