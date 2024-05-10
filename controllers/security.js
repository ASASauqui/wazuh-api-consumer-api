const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');

const userAuthenticate = async (req, res) => {
    try {
        const body = req.body;

        const { user, password } = body;

        if (!user || !password) {
            return res.status(400).json({ message: 'User and password are required' });
        }

        const credentials = `${user}:${password}`;
        const encodedCredentials = Buffer.from(credentials).toString('base64');

        const response = await axios.post(`${process.env.API_URL}/security/user/authenticate`, {}, {
            headers: { 'Authorization': `Basic ${encodedCredentials}` },
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

const userLogout = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const response = await axios.delete(`${process.env.API_URL}/security/user/authenticate`, {
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

const listUsers = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const response = await axios.get(`${process.env.API_URL}/security/users`, {
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

const addUser = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const response = await axios.post(`${process.env.API_URL}/security/users`, { username, password }, {
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

const deleteUsers = async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const { user_ids } = req.query;

        if (!user_ids) {
            return res.status(400).json({ message: 'User IDs are required' });
        }

        const response = await axios.delete(`${process.env.API_URL}/security/users?user_ids=${user_ids}`, {
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
    userAuthenticate,
    userLogout,
    listUsers,
    addUser,
    deleteUsers
};
