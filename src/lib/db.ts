import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;
if (!MONGODB_URI) throw new Error("Plese provide mongodb url");

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}

/**
 * Database connection
 * @returns
 */
export async function connectDb() {
  if (cached.conn) return cached.conn;
  try {
    cached.conn = await mongoose.connect(MONGODB_URI!);
    console.log("DATABASE CONENCTED!");
    return cached.conn;
  } catch (error) {
    console.log("Database error", error);
  }
}
