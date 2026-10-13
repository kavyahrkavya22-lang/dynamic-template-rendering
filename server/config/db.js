const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      console.log(`Connecting to specified MongoDB URI...`);
      await mongoose.connect(mongoUri);
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return;
    }

    // Try connecting to local MongoDB daemon first
    try {
      console.log('Attempting connection to local MongoDB (mongodb://127.0.0.1:27017/dynamic_template_db)...');
      await mongoose.connect('mongodb://127.0.0.1:27017/dynamic_template_db', {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`Local MongoDB Connected: ${mongoose.connection.host}`);
      return;
    } catch (localErr) {
      console.log('Local MongoDB not found or unreachable. Initializing MongoMemoryServer fallback...');
    }

    // Fallback to MongoMemoryServer
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongodInstance = await MongoMemoryServer.create();
    const memoryUri = mongodInstance.getUri();
    await mongoose.connect(memoryUri);
    console.log(`In-Memory MongoDB Connected at: ${memoryUri}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
