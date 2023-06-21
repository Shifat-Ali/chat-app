const mongoose = require("mongoose");

const password = "Sds%23chatapp";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://shifatali21:${password}@cluster0.2gzp4xx.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
