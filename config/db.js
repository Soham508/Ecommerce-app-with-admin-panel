import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sohamghige14:soham%40586@cluster0.60fjn21.mongodb.net/ecommerce"
    );
    console.log("connected to the database".bgMagenta.white);
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
