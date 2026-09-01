import mongoose from 'mongoose';
import { MONGODB_URI } from './utils.js';

export default async function connectDB() {
  await mongoose.connect(MONGODB_URI);
  console.log(`Database connected: ${MONGODB_URI}`);
}
