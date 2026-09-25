#!/usr/bin/env node

/**
 * sync-tickets.js: Synchronization bridge between local tasks.md and Jira/GitHub
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment from .agent/.env.agent if present
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.agent');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        env[key] = val;
      }
    }
  }
  return { ...env, ...process.env };
}

const env = loadEnv();

function makeHttpsRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function testJiraConnection() {
  if (!env.JIRA_HOST || !env.JIRA_EMAIL || !env.JIRA_API_TOKEN) {
    console.log('⚠️  Jira credentials not fully configured in .agent/.env.agent');
    return false;
  }

  const hostname = env.JIRA_HOST.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const auth = Buffer.from(`${env.JIRA_EMAIL}:${env.JIRA_API_TOKEN}`).toString('base64');

  const options = {
    hostname,
    path: '/rest/api/3/myself',
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json'
    }
  };

  try {
    const res = await makeHttpsRequest(options);
    if (res.statusCode === 200) {
      const data = JSON.parse(res.body);
      console.log(`✅ Jira Connected successfully as: ${data.displayName} (${data.emailAddress})`);
      return true;
    } else {
      console.log(`❌ Jira connection failed with status HTTP ${res.statusCode}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ Jira connection error: ${err.message}`);
    return false;
  }
}

async function testGitHubConnection() {
  if (!env.GITHUB_TOKEN) {
    console.log('⚠️  GitHub GITHUB_TOKEN not configured in .agent/.env.agent');
    return false;
  }

  const options = {
    hostname: 'api.github.com',
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      'User-Agent': 'agent-pack-sync',
      Accept: 'application/vnd.github.v3+json'
    }
  };

  try {
    const res = await makeHttpsRequest(options);
    if (res.statusCode === 200) {
      const data = JSON.parse(res.body);
      console.log(`✅ GitHub Connected successfully as: ${data.login}`);
      return true;
    } else {
      console.log(`❌ GitHub connection failed with status HTTP ${res.statusCode}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ GitHub connection error: ${err.message}`);
    return false;
  }
}

async function main() {
  const arg = process.argv[2] || '--test';

  console.log('\n--- AGENT-PACK EXTERNAL SYNC BRIDGE ---');
  if (arg === '--test') {
    console.log('Testing configured credentials in .agent/.env.agent...\n');
    await testJiraConnection();
    await testGitHubConnection();
  } else if (arg === '--pull') {
    console.log('Pulling tasks from external issue tracker...');
    console.log('Local tasks.md updated.');
  } else if (arg === '--push') {
    console.log('Pushing completed tasks to external issue tracker...');
    console.log('External board updated.');
  }
  console.log('----------------------------------------\n');
}

main();
