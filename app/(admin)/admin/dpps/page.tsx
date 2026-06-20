'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminDppUploader() {
  const supabase = createClient();
  const [title, setTitle] = useState('');
  const [batchId, setBatchId] = useState('JEE 2027');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) return alert('Please fill all fields');
    setUploading(true);

    // 1. Upload File
    const fileExt = file.name.split('.').pop();
    const fileName = `dpp-${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('dpps').upload(fileName, file);

    if (uploadError) return alert(uploadError.message);

    // 2. Save Reference
    await supabase.from('dpps').insert({ title, batch_id: batchId, file_path: fileName });
    
    setUploading(false);
    alert('DPP Uploaded Successfully!');
    setTitle('');
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-red-500">Upload DPP</h1>
      <div className="bg-[#11161d] p-6 rounded-lg border border-gray-800 space-y-4">
        <Input placeholder="DPP Title (e.g. Physics - Kinematics)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Batch ID" value={batchId} onChange={(e) => setBatchId(e.target.value)} />
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Button onClick={handleUpload} disabled={uploading} className="w-full bg-emerald-600">
          {uploading ? 'Uploading...' : 'Publish DPP'}
        </Button>
      </div>
    </div>
  );
}