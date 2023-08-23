import mongoose from 'mongoose';

import { HttpException } from '../../../errors/http-exception.error';

export async function connectMongoDb() {
  if (!process.env.MONGODB_KEY) {
    throw new HttpException(498, '.env not found');
  }

  try {
    await mongoose.connect(process.env.MONGODB_KEY);
    console.log('🚀 ~ Database connected');
  } catch (error) {
    console.log('🚀 ~ file: index.ts:11 ~ connectMongoDb ~ error:', error);
  }
}
