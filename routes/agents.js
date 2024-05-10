const express = require('express');

const router = express.Router();

const {
    listAgents,
    addAgent,
    deleteAgents
} = require('../controllers/agents');

router.get('/', listAgents);
router.post('/', addAgent);
router.delete('/', deleteAgents);

module.exports = router;
