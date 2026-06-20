import Link from 'next/link';
import { login } from './actions';

export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ message?: string }> 
}) {
  const { message } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0d12] text-white p-4">
      
      <div className="max-w-md w-full bg-[#11161d] p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-emerald-500 blur-xl opacity-50"></div>

        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent inline-block mb-2">
            AIMERS ERP
          </Link>
          <p className="text-gray-400 text-sm">Secure Portal Login</p>
        </div>

        <form action={login} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="student@example.com"
              required
              className="w-full bg-[#0a0d12] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-[#0a0d12] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {/* Error Message Display */}
          {message && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm text-center">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Need access? Contact the administration desk.
        </div>
      </div>
    </div>
  );
}