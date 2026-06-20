'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminTestUploader() {
  const supabase = createClient();

  // Form State
  const [title, setTitle] = useState('');
  const [batchId, setBatchId] = useState('JEE 2027');
  const [duration, setDuration] = useState('180');
  const [totalQuestions, setTotalQuestions] = useState('10'); // Default to 10 for testing
  const [file, setFile] = useState<File | null>(null);
  const [answerKey, setAnswerKey] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleKeyChange = (qNum: number, answer: string) => {
    setAnswerKey(prev => ({ ...prev, [qNum.toString()]: answer }));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }

    const questionsCount = parseInt(totalQuestions);
    if (Object.keys(answerKey).length < questionsCount) {
      alert('Please select an answer for every question before submitting.');
      return;
    }

    setStatus('uploading');

    try {
      // 1. Securely upload the PDF to the Supabase 'tests' bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `test-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('tests')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Log the test details and the Answer Key into the database
      const { error: dbError } = await supabase.from('mock_tests').insert({
        title,
        batch_id: batchId,
        duration_minutes: parseInt(duration),
        total_questions: questionsCount,
        pdf_path: fileName,
        answer_key: answerKey
      });

      if (dbError) throw dbError;

      setStatus('success');
      alert('Test successfully deployed to the Student Portal!');
      
      // Reset form
      setTitle('');
      setFile(null);
      setAnswerKey({});
      setStatus('idle');

    } catch (error: any) {
      alert(`Upload failed: ${error.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-red-500">Test Engine Command</h1>
        <p className="text-gray-400 mt-2">Upload Mock Tests and configure digital OMR keys.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Test Settings */}
        <Card className="bg-[#11161d] border-red-900/30 text-white h-fit">
          <CardHeader>
            <CardTitle className="text-xl">1. Test Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="test-form" onSubmit={handleUpload} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400">Test Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Physics Full Syllabus Test 01" className="bg-[#0a0d12] border-gray-700 mt-1" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Target Batch</label>
                  <Input value={batchId} onChange={(e) => setBatchId(e.target.value)} className="bg-[#0a0d12] border-gray-700 mt-1" required />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Duration (Minutes)</label>
                  <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-[#0a0d12] border-gray-700 mt-1" required />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Total Questions</label>
                <Input type="number" min="1" max="100" value={totalQuestions} onChange={(e) => setTotalQuestions(e.target.value)} className="bg-[#0a0d12] border-gray-700 mt-1" required />
              </div>

              <div>
                <label className="text-sm text-gray-400">Upload Test PDF</label>
                <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="bg-[#0a0d12] border-gray-700 mt-1 file:text-emerald-500 file:bg-transparent file:border-0" required />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Side: Dynamic Answer Key Builder */}
        <Card className="bg-[#11161d] border-red-900/30 text-white">
          <CardHeader>
            <CardTitle className="text-xl">2. Master Answer Key</CardTitle>
            <p className="text-xs text-gray-400">Configure correct answers for auto-grading.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-h-[400px] overflow-y-auto pr-2">
              {Array.from({ length: parseInt(totalQuestions) || 0 }).map((_, i) => {
                const qNum = i + 1;
                return (
                  <div key={qNum} className="flex items-center justify-between bg-[#0a0d12] p-2 rounded border border-gray-800">
                    <span className="font-mono text-gray-400 text-sm w-6">{qNum}.</span>
                    <div className="flex gap-1">
                      {['A', 'B', 'C', 'D'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleKeyChange(qNum, opt)}
                          className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                            answerKey[qNum.toString()] === opt 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <Button 
                type="submit" 
                form="test-form" 
                disabled={status === 'uploading'} 
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg"
              >
                {status === 'uploading' ? 'Deploying to Students...' : 'Publish Test'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}