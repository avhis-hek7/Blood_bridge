const mongoose=require('mongoose');
const mongoURI="mongodb://0.0.0.0:27017/admin"

const connectToMongo=()=>
    {
        mongoose.connect(mongoURI).then(()=>console.log("Connected Sucessfully ")).catch((e)=>console.log(e.message))
    }
module.exports= connectToMongo;////mongodb://localhost:27017/ 