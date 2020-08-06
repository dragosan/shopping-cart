const {model,Schema} = require('mongoose')


const ProductSchema = new Schema({
    title: {type:String , required:true},
    image: {type:String , default:"default.jpg"},
    description: String,
    availableSizes: [String],
    inStock:{type:Number,default:0},
    price: {type:Number,required:true}
})

module.exports = model("Product",ProductSchema)