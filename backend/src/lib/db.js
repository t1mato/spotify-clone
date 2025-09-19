import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("🔄 Attempting to connect to MongoDB...");
        console.log("MongoDB URI exists:", process.env.MONGODB_URI ? "✅" : "❌");
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ Connected to MongoDB ${conn.connection.host}`);
        console.log(`📊 Using database: ${conn.connection.name}`);
        
    } catch (error) {
        console.log("❌ Failed to connect to MongoDB");
        console.error("Full error:", error);
        process.exit(1);
    }
}