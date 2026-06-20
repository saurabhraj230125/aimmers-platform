import Link from 'next/link';
import { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Check if the logged-in user is an Admin
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile && profile.role === 'admin') {
      isAdmin = true;
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0d12] text-white">
      {/* Student Sidebar */}
      <aside className="w-64 bg-[#11161d] border-r border-gray-800 p-6 flex flex-col justify-between">
        
        {/* Top Section: Navigation */}
        <div>
          <div>
            <h2 className="text-xl font-bold text-emerald-500">Aimers Portal</h2>
            <p className="text-xs text-gray-500 font-mono tracking-widest mt-1">JEE 2027 BATCH</p>
          </div>
          <nav className="flex flex-col gap-2 mt-8">
            <Link href="/dashboard" className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              📚 Video Lectures
            </Link>
            <Link href="/dashboard/dpps" className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              📝 Daily Practice (DPPs)
            </Link>
            <Link href="/dashboard/tests" className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              🏆 Mock Tests
            </Link>
          </nav>
        </div>

        {/* Bottom Section: Secret Admin Button */}
        {isAdmin && (
          <div className="pt-6 border-t border-gray-800">
            <Link href="/admin">
              <button className="w-full px-4 py-3 rounded-md bg-red-900/30 text-red-400 border border-red-900/50 hover:bg-red-900/50 transition-colors text-sm font-bold tracking-wider uppercase text-center">
                ⚙️ Switch to Admin
              </button>
            </Link>
          </div>
        )}

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}