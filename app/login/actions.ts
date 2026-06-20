"use server";

import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = await cookies();

  // 1. Create the secure database connection
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Handle edge case where cookies can't be set
          }
        },
      },
    }
  );

  // 2. Check the password
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Incorrect email or password');
  }

  // ⭐ THE MASTER BYPASS ⭐
  // IMPORTANT: Change the email below to your actual admin login email!
  if (data.user.email === 'your_admin_email@example.com') {
    return redirect('/admin'); 
  }

  // 3. Fetch their exact role from the database for everyone else
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  // 4. SMART REDIRECTION: Send them to their designated portal
  if (profile?.role === 'admin') {
    return redirect('/admin');
  } else {
    return redirect('/dashboard');
  }
}