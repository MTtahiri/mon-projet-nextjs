"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Connecté en tant que {session.user.email}
        <button onClick={() => signOut()}>Se déconnecter</button>
      </>
    );
  }

  return (
    <>
      Non connecté
      <button onClick={() => signIn()}>Se connecter</button>
    </>
  );
}
