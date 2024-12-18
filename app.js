import "dotenv/config";
import Fastify from "fastify";
import cookie from '@fastify/cookie';  // Change import name
import session from '@fastify/session';  // Change import name
import { connectDB } from './src/config/connect.js';
import { PORT, sessionStore, COOKIE_PASSWORD } from "./src/config/config.js";
import { admin, buildAdminRouter } from "./src/config/setup.js";

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        const app = Fastify({
            logger: true
        });

        // Register cookie plugin first
        await app.register(cookie);
        
        // Add a small delay to ensure cookie plugin is registered
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Then register session
        await app.register(session, {
            //secret: COOKIE_PASSWORD,
            store: sessionStore,
            cookieName: 'sessionId',
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true
            }
        });

        // Then build admin router
        await buildAdminRouter(app);

        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`Zocket started on http://localhost:${PORT}${admin.options.rootPath}`);
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

start();