const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Example of hashing a password
hashPassword('john123').then(hashed => {
    console.log('Hashed password:', hashed);
}).catch(err => {
    console.error('Error hashing password:', err);
});