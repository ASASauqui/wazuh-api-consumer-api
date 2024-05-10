const express = require('express');

const router = express.Router();

const {
    userAuthenticate,
    userLogout
} = require('../controllers/security');

router.post('/user/authenticate', userAuthenticate);
router.delete('/user/authenticate', userLogout);

module.exports = router;
