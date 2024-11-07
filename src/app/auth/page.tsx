import { signIn } from 'next-auth/react';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <button
        onClick={() => signIn('discord')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with Discord
      </button>
    </div>
  );
}
