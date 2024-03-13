import mongoose, {InferSchemaType} from 'mongoose';
import config from '../setup/config';

async () => {
  await mongoose.connect(`${config.dbUrl}/${config.dbName}`);
  console.log('Connected to database!🚀');
}

const tripSchema = new mongoose.Schema({
  startDate: Date,
  duration: Number,
  travellers: [String],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },
  rating: Number
})


tripSchema.index({ location: '2dsphere' });

export type TripType = InferSchemaType<typeof tripSchema>;
const Trip = mongoose.model('trips', tripSchema);

export default Trip;