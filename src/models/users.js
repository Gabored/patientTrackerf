const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientId: {
    type: String,
    required: true,
    unique: true
  },
  enterDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  assignedDoctor: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient']
  },
  IoT: {
    type: String,
    required: false,
    default: "https://api.thingspeak.com/channels/CHANNEL_ID/feeds.json"
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
