import mongoose, { InferSchemaType } from "mongoose";
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
});

tripSchema.index({ location: "2dsphere" });

const Trip = mongoose.model("trips", tripSchema);

export default Trip;
