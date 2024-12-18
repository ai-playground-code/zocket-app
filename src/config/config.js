// config.js
import 'dotenv/config';
import fastifySession from '@fastify/session';
import ConnectMongoDBSession from 'connect-mongodb-session';

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24,
    autoRemove: 'native',  // Add this
    autoRemoveInterval: 10 // Add this
});

sessionStore.on('error', (error) => {
    console.error('Session store error:', error);
});

export const authenticate = async (email, password) => {
    // Hardcoded authentication
    const isValid = email === 'praneeth.vedalaveni@gmail.com' && password === '12345678';
    if (isValid) {
        return { email, role: 'admin' };
    }
    return null;
};

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;