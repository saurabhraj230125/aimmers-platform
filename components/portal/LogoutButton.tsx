'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    // 1. Tell Supabase to destroy the secure session
    await supabase.auth.signOut();
    
    // 2. Clear the router cache and send them back to login
    router.refresh();
    router.push('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="w-full px-4 py-2 mt-4 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-left text-sm flex items-center gap-2"
    >
      🚪 Log Out
    </button>
  );
}