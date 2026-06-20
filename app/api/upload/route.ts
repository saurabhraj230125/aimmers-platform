import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate the user calling this API
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Verify they are an Admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
    }

    // 3. Get the video title from the request body
    const body = await request.json();
    const { title } = body;

    const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
    const apiKey = process.env.BUNNY_API_KEY;

    // 4. Ask Bunny.net to create a placeholder video
    const bunnyResponse = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
      method: 'POST',
      headers: {
        'AccessKey': apiKey as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title }),
    });

    if (!bunnyResponse.ok) {
      throw new Error('Failed to create video placeholder in Bunny.net');
    }

    const videoData = await bunnyResponse.json();

    // 5. Return the Video ID to the Admin Frontend
    return NextResponse.json({
      videoId: videoData.guid,
      message: 'Placeholder created. Ready for direct upload.',
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}