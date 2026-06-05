const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');
const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL || null;
const ALLOWED_ACCESS_CODE = process.env.ALLOWED_ACCESS_CODE || null;
const AUTH_URL = process.env.AUTH_URL || 'http://4.224.186.213/evaluation-service/auth';

async function getAuthToken(email, accessCode, githubusername) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, accessCode, githubusername })
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.error || body?.message || `auth service returned ${response.status}`;
    throw new Error(message);
  }

  const token = body?.token || body?.access_token || body?.authToken || body?.authorization;
  if (!token) {
    throw new Error('auth service did not return a token');
  }

  return token;
}

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/register', async (req, res) => {
  try {
    const { email, name, mobileNo, githubusername, accessCode } = req.body;
    if (!email || !name || !mobileNo || !githubusername || !accessCode) {
      return res.status(400).json({ error: 'email, name, mobileNo, githubusername and accessCode are required' });
    }

    // basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'invalid email' });

    // basic mobile number validation (digits only, 7-15 characters)
    const mobileRegex = /^[0-9]{7,15}$/;
    if (!mobileRegex.test(mobileNo)) return res.status(400).json({ error: 'invalid mobileNo' });

    // enforce allowlist if configured
    if (ALLOWED_EMAIL && email.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      return res.status(403).json({ error: 'registrations are restricted to a specific email' });
    }
    if (ALLOWED_ACCESS_CODE && accessCode !== ALLOWED_ACCESS_CODE) {
      return res.status(403).json({ error: 'invalid access code for this registration' });
    }

    const users = await readUsers();
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const token = await getAuthToken(email, accessCode, githubusername);

    const id = Date.now().toString();
    const user = { id, email, name, mobileNo, githubusername, accessCode, createdAt: new Date().toISOString() };
    users.push(user);
    await writeUsers(users);

    // don't return accessCode in response
    const { accessCode: _a, ...publicUser } = user;
    res.status(201).json({ user: publicUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Registration API listening on ${PORT}`));
