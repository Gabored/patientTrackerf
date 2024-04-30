const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Credential = require('../models/credentials');

// Secret key for JWT signing and encryption
console.log("Using JWT Secret: ", process.env.JWT_SECRET || 'fallback_secret');
const secretKey = process.env.JWT_SECRET || 'secret';

const loginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const credential = await Credential.findOne({ username });
    if (!credential) {
      res.status(401).send('<div style="color: red;">Error, check username/password.</div>');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, credential.password);
    if (!passwordMatch) {
      res.status(401).send('<div style="color: red;">Error, check username/password.</div>');
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: credential.userId },
      secretKey,
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    console.log("Token  Log IN:  " + token);
    // Redirect to dashboard and set the token in the headers or as a cookie
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
   

  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = loginMiddleware;
