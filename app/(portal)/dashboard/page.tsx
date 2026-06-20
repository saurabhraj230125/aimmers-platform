import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import SecurePlayer from '@/components/portal/SecurePlayer';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: lectures } = await supabase
    .from('lectures')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Video Lectures</h1>
        <p className="text-gray-400 text-sm">Welcome back, {user.email}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {lectures && lectures.length > 0 ? (
          lectures.map((lecture) => (
            <Card key={lecture.id} className="bg-[#11161d] border-gray-800 text-white overflow-hidden">
              <SecurePlayer videoId={lecture.video_id} title={lecture.title} />
              <CardHeader>
                <CardTitle className="text-lg">{lecture.title}</CardTitle>
                <p className="text-xs text-emerald-400 font-mono mt-2">Batch: {lecture.batch_id}</p>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No lectures assigned yet.</p>
        )}
      </div>
    </div>
  );
}