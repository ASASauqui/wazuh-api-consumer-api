const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');

const listAgents = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const response = await axios.get(`${process.env.API_URL}/agents`, {
            headers: { 'Authorization': authorization },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });

        return res.status(response.status).json(response.data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addAgent = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: 'Token is required' });
        }

        var { name, ip } = req.body;

        ip = ip || '';

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const response = await axios.post(`${process.env.API_URL}/agents`, { name, ip }, {
            headers: { 'Authorization': authorization },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });

        return res.status(response.status).json(response.data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteAgents = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const { agents_list, status } = req.query;

        if (!agents_list) {
            return res.status(400).json({ message: 'Agents list is required' });
        }

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const response = await axios.delete(`${process.env.API_URL}/agents?pretty=true&older_than=0s&agents_list=${agents_list}&status=${status}&purge=true`, {
            headers: { 'Authorization': authorization },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });

        return res.status(response.status).json(response.data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listAgents,
    addAgent,
    deleteAgents
};
