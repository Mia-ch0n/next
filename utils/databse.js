import mongoose from 'mongoose';



export const connectToDB = async () => {


  try {
    await mongoose.connect(process.env.MONGODB_URI);
 console.log("connected");
  } catch (error) {
console.log("error while connecting",error);
  }
}