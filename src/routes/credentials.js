const express = require('express');
const router = express.Router();
const Credential = require('../models/credentials');
const bcrypt = require('bcryptjs');

// Create new credentials
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newCredential = new Credential({
      username: req.body.username,
      password: hashedPassword,
      userId: req.body.userId
    });
    const savedCredential = await newCredential.save();
    res.status(201).send(savedCredential);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all credentials
router.get('/', async (req, res) => {
    try {
      const users = await Credential.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Retrieve credentials by user ID
router.get('/:userId', async (req, res) => {
  try {
    const credential = await Credential.findOne({ userId: req.params.userId });
    if (!credential) {
      return res.status(404).send();
    }
    res.status(200).send(credential);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update credentials
router.put('/:userId', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updatedCredential = await Credential.findOneAndUpdate(
      { userId: req.params.userId },
      { username: req.body.username, password: hashedPassword },
      { new: true }
    );
    res.status(200).send(updatedCredential);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete credentials
router.delete('/:userId', async (req, res) => {
  try {
    const deletedCredential = await Credential.findOneAndDelete({ userId: req.params.userId });
    if (!deletedCredential) {
      return res.status(404).send();
    }
    res.status(200).send(deletedCredential);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
