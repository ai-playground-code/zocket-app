// setup.js
import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from '@adminjs/mongoose';
import * as Models from '../models/index.js';
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";

AdminJS.registerAdapter(AdminJSMongoose);

export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            options: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"],
            },
        },
        {
            resource: Models.DeliveryPartner,
            options: {
                listProperties: ["email", "role", "isActivated"],
                filterProperties: ["email", "role"],
            },
        },
        {
            resource: Models.admin,
            options: {
                listProperties: ["email", "role", "isActivated"],
                filterProperties: ["email", "role"],
            },
        },
        {
            resource: Models.Branch,
        },
    ],
    branding: {
        companyName: 'Zocket',
        withMadeWithLove: false,
    },
    rootPath: "/admin",
});

export const buildAdminRouter = async (app) => {
    // Add debug hooks
    app.addHook('onRequest', (request, reply, done) => {
        console.log('Request received:', request.url);
        done();
    });

    app.addHook('onResponse', (request, reply, done) => {
        console.log('Response sent:', reply.statusCode);
        done();
    });

    const router = await AdminJSFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword: COOKIE_PASSWORD,
            cookieName: "adminjs",
        },
        app,
        {
            store: sessionStore,
            saveUninitialized: false,
            secret: COOKIE_PASSWORD,
            cookie: {
                httpOnly: true,
                secure: false,  // Set to false for development
                maxAge: 24 * 60 * 60 * 1000
            },
            name: 'adminjs-session',  // Add this
            rolling: true,  // Add this
            resave: false
        }
    );

    return router;
};