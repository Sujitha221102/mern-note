const mongoose=require("mongoose")

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.log("MONGODB NOT CONNECTED",error)
        process.exit(1)
    }
}

module.exports={connectDB}