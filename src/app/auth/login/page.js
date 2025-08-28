'use client';
import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        
        {providers && Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Se connecter avec {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}