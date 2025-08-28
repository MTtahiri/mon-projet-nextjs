import NextAuth from '@auth/core';
import Google from '@auth/core/providers/google';

export const handlers = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.AUTH_SECRET
});
