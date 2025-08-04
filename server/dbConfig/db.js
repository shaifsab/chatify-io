const mongoose = require('mongoose');

const dbConfig = async () => {
  try {
    // MongoDB database
    await mongoose.connect(process.env.DB_CONECTION_STRING);
    console.log('Connected to the database successfully!');

  } catch (error) { 
    console.error('Error connecting to the database:', error);
    process.exit(1);  

  }
};

module.exports = dbConfig;
