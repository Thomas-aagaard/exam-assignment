const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Used for hashing passwords!

// I recommend that you store your users in MongoDB using Mongoose instead of this.
const users = [
    // These are just some test users with passwords.
    // The passwords are in clear text for testing purposes (don't do this in production).
    { id: 0, username: "tom", password: '123'},
    { id: 1, username: "svend", password: '555'},
    { id: 2, username: "niels", password: 'niller'},
    { id: 4, username: "admin", password: '123'}
];

// Creating more test data: We run through all users and add a hash of their password to each.
// In practice, you should hash when passwords are created, not later.
users.forEach(async user => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) reject(err); else resolve(hash);
        });
    });

    user.hash = hashedPassword; // The hash has been made, and is stored on the user object.
    delete user.password; // Let's remove the clear text password (it shouldn't be there in the first place)
    console.log(`Hash generated for ${user.username}:`, user); // Logging for debugging purposes
});

// Create the routes and export the router
module.exports = secret => {

    router.post('/', (req, res) => {
        // TODO: Implement user account creation
        res.status(501).json({msg: "create new user not implemented"});
    });

    router.put('/', (req, res) => {
        // TODO: Implement user update (change password, etc).
        res.status(501).json({msg: "update user not implemented"});
    });

    // This route takes a username and a password and create an auth token
    router.post('/authenticate', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            console.error(msg);
            res.status(401).json({msg: msg});
            return;
        }

        const user = users.find((user) => user.username === username);
        if (user) { // If the user is found
            bcrypt.compare(password, user.hash, (err, result) => {
                if (result) { // If the password matched
                    const payload = { username: username };
                    const token = jwt.sign(payload, secret, { expiresIn: '24h' });

                    res.json({
                        msg: `User '${username}' authenticated successfully`,
                        token: token
                    });
                }
                else res.status(401).json({msg: "Password mismatch!"})
            });
        } else {
            res.status(404).json({msg: "User not found!"});
        }
    });

    return router;
};