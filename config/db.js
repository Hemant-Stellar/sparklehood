const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use different connection options for test environment
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    if (process.env.NODE_ENV !== 'test') {
      console.log(`MongoDB Connected to DB Name: ${conn.connection.name}`);
    }
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;