import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function StudentTestsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');

  // Fetch all available tests from Supabase
  const { data: tests } = await supabase
    .from('mock_tests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Mock Test Series</h1>
        <p className="text-gray-400 mt-2">Take your assigned exams and track your performance.</p>
      </header>

      <div className="grid gap-4">
        {tests && tests.length > 0 ? (
          tests.map((test) => (
            <Card key={test.id} className="bg-[#11161d] border-gray-800 text-white flex justify-between items-center p-2">
              <CardHeader>
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <div className="flex gap-4 mt-2">
                  <p className="text-xs text-emerald-500 font-mono uppercase tracking-widest">
                    Batch: {test.batch_id}
                  </p>
                  <p className="text-xs text-gray-400 font-mono uppercase">
                    Duration: {test.duration_minutes} Mins
                  </p>
                </div>
              </CardHeader>
              <div className="pr-6">
                <Link href={`/dashboard/tests/${test.id}`}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                    Start Exam
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 bg-[#11161d] p-6 rounded-lg border border-gray-800">
            No mock tests available right now.
          </p>
        )}
      </div>
    </div>
  );
}