import crypto from 'crypto';

// Generate secrets
const COOKIE_PASSWORD = crypto.randomBytes(32).toString('hex');
const AccessTokenSecret = crypto.randomBytes(32).toString('hex');
const REFRESH_TOKEN_SECRET = crypto.randomBytes(32).toString('hex');

// Print them in .env format
console.log('\nCopy these into your .env file:\n');
console.log(`COOKIE_PASSWORD=${COOKIE_PASSWORD}`);
console.log(`ACCESS_TOKEN_SECRET=${AccessTokenSecret}`);
console.log(`REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}\n`);