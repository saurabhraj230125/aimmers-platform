'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const [videoTitle, setVideoTitle] = useState('');
  const [status, setStatus] = useState('idle');

  const handleCreateLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');

    try {
      // 1. Call the API we built in Phase 4
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: videoTitle }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        alert(`Success! Bunny Video ID created: ${data.videoId}. Now upload the MP4 via Bunny.net dashboard for this ID, and add it to your Supabase lectures table!`);
        setVideoTitle('');
      } else {
        setStatus('error');
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Admin Control Panel</h1>
        <p className="text-gray-400 mt-2">Manage infrastructure, uploads, and student data.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lecture Upload Node */}
        <Card className="bg-[#11161d] border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Initialize Secure Lecture</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateLecture} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400">Lecture Title</label>
                <Input 
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g., Physics: Kinematics 01" 
                  className="bg-[#0a0d12] border-gray-700 mt-1"
                  required
                />
              </div>
              <Button type="submit" disabled={status === 'processing'} className="bg-emerald-600 hover:bg-emerald-700">
                {status === 'processing' ? 'Generating Secure Keys...' : 'Create Video Node'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}