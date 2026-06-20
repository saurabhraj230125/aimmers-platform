import Link from 'next/link';
import { ReactNode } from 'react';
import LogoutButton from '@/components/portal/LogoutButton';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0d12] text-white">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#11161d] border-r border-red-900/30 p-6 flex flex-col justify-between">
        
        {/* Top Section: Admin Tools */}
        <div>
          <div>
            <h2 className="text-xl font-bold text-red-500">System Admin</h2>
            <p className="text-xs text-gray-500 font-mono tracking-widest mt-1">COMMAND CENTER</p>
          </div>
          <nav className="flex flex-col gap-2 mt-8">
            <Link href="/admin" className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              📊 Overview & Uploads
            </Link>
            <Link href="/admin/tests" className="px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              🎯 Test Engine Command
            </Link>
          </nav>
        </div>

        {/* Bottom Section: Portal Switch & Logout */}
        <div className="pt-6 border-t border-red-900/30 flex flex-col gap-2">
          
          <LogoutButton />

          <Link href="/dashboard">
            <button className="w-full px-4 py-3 mt-2 rounded-md bg-emerald-900/20 text-emerald-500 border border-emerald-900/50 hover:bg-emerald-900/40 transition-colors text-sm font-bold tracking-wider uppercase text-center">
              🎓 View as Student
            </button>
          </Link>

        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}