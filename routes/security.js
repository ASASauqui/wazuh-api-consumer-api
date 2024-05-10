const express = require('express');

const router = express.Router();

const {
    userAuthenticate,
    userLogout,
    listUsers,
    addUser,
    deleteUsers
} = require('../controllers/security');

router.post('/user/authenticate', userAuthenticate);
router.delete('/user/authenticate', userLogout);
router.get('/users', listUsers);
router.post('/users', addUser);
router.delete('/users', deleteUsers);

module.exports = router;
