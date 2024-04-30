const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  patientId: {
    type: String,
    required: true,
    ref: 'User'  // Link to the User model where user role is 'Patient'
  },
  doctorId: {
    type: String,
    required: true,
    ref: 'User'  // Link to the User model where user role is 'Doctor'
  },
  visibility: {
    type: String,
    required: true,
    enum: ['private', 'public']
  },
  body: {
    type: String,
    required: true
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
