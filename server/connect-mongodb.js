const mongoose = require("mongoose")

const mongooseString = process.env.MONGODB 

mongoose.connect(mongooseString, {
    // optionsn
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connect success to mongo atlas!")
})
.catch((err) => {
    console.error("connect failed to mongo atlas")
    console.error(err.message)
})
