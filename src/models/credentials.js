const mongoose = require('mongoose');

const credentialsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'User' 
  }
});

const Credential = mongoose.model('credentials', credentialsSchema, 'credentials');

module.exports = Credential;
