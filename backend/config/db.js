// ./config/db.js
import mongoose from 'mongoose';


const connectDB = async() =>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log(`\n MongoDB connected!! DB HOSt:${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB Connection error", error);
    process.exit(1);
  }
}
export default connectDB;

