const mongoose=require('mongoose');

 

const mongoURI="mongodb://0.0.0.0:27017/"
 
 
const connectToMongo = async () => {

    try {
  
      mongoose.set("strictQuery", false);
  
      mongoose.connect(mongoURI);
  
      console.log("Connected to mongoDB successfully");
  
    } catch (error) {
  
      console.log(error);
  
      process.exit();
  
    }
  
  };

module.exports= connectToMongo;