const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

// Create a new note
router.post('/', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.status(201).send(savedNote);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all notes for a specific patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const notes = await Note.find({ patientId: req.params.patientId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a note
router.put('/:postId', async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { postId: req.params.postId },
      req.body,
      { new: true }
    );
    res.status(200).send(updatedNote);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a note
router.delete('/:postId', async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ postId: req.params.postId });
    if (!deletedNote) {
      return res.status(404).send();
    }
    res.status(200).send(deletedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
