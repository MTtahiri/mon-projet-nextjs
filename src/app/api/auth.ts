import { auth } from "@auth/core";          // ⚠ vérifie bien que c’est l’export par défaut
import Google from "@auth/core/providers/google";

export const handlers = auth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET!,
});
