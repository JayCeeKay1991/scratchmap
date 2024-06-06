import mongoose from "mongoose";
import config from "./setup/config";

async function main() {
  try {
    await mongoose.connect(`${config.dbUrl}/${config.dbName}`);
    console.log("Connected to database!🚀");
  } catch (error) {
    console.error("🔥 Error in the database connection:", error);
  }
}
main();

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const tripSchema = new mongoose.Schema({
  startDate: Date,
  duration: Number,
  travellers: [String],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  address: String,
  rating: Number,
  image: String,
});

tripSchema.index({ location: "2dsphere" });

const Trip = mongoose.model("trips", tripSchema);
const User = mongoose.model("users", userSchema);

export { Trip, User };
