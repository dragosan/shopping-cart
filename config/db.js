const mongoose = require('mongoose')

module.exports= connectDB = async () =>{
    try {
const conn = await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
console.log(`database connected : ${conn.connection.host}`)

    } catch (err) {
       console.log(err)
       process.exit(1) 
    }
}