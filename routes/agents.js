const express = require('express');

const router = express.Router();

const {
    listAgents,
    addAgent,
    deleteAgents,
    summarizeAgentsStatus
} = require('../controllers/agents');

router.get('/', listAgents);
router.post('/', addAgent);
router.delete('/', deleteAgents);
router.get('/summary/status', summarizeAgentsStatus);

module.exports = router;
