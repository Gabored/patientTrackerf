const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');
const credentialsRoutes = require('./credentials');
const notesRoutes = require('./notes');
const loginMiddleware = require('../middleware/log-in');
const logoutMiddleware = require('../middleware/log-out');




router.use('/users', usersRoutes);
router.use('/credentials', credentialsRoutes);
router.use('/notes', notesRoutes);

router.post('/login', loginMiddleware);  
router.get('/logout', logoutMiddleware);

module.exports = router;