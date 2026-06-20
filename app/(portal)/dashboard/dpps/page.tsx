import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';

export default async function DppsPage() {
  const supabase = await createClient();
  const { data: dpps } = await supabase.from('dpps').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Daily Practice Problems</h1>
      <div className="grid gap-4">
        {dpps?.map((dpp) => (
          <div key={dpp.id} className="bg-[#11161d] border border-gray-800 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{dpp.title}</h2>
              <p className="text-xs text-gray-400">Batch: {dpp.batch_id}</p>
            </div>
            {/* The Download Link */}
            <a href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/authenticated/dpps/${dpp.file_path}`} download>
              <Button variant="outline" className="border-emerald-600 text-emerald-500 hover:bg-emerald-900/20">
                Download PDF
              </Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}