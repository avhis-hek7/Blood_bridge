const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/event"

const connectToMongo=()=>
    {
        mongoose.connect(mongoURI).then(()=>console.log("Connected Sucessfully ")).catch((e)=>console.log(e.message))
    }
module.exports= connectToMongo;