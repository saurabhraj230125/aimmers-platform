'use client';

import { useState, useEffect, use } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function ExamRoom({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the Next.js 15 URL parameters
  const { id } = use(params);

  const supabase = createClient();
  const [testData, setTestData] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    async function loadTest() {
      const { data } = await supabase
        .from('mock_tests')
        .select('*')
        .eq('id', id)
        .single();
      setTestData(data);
    }
    loadTest();
  }, [id]);

  const handleBubbleClick = (questionNum: number, option: string) => {
    setAnswers(prev => ({ ...prev, [questionNum.toString()]: option }));
  };

  const submitTest = async () => {
    if (!testData) return;
    
    // Auto-Grader Logic (+4 for correct, -1 for incorrect)
    let score = 0;
    const answerKey = testData.answer_key;
    
    Object.keys(answers).forEach(qNum => {
      if (answers[qNum] === answerKey[qNum]) {
        score += 4;
      } else if (answers[qNum]) {
        score -= 1;
      }
    });

    const { data: { user } } = await supabase.auth.getUser();
    
    // Save to Database
    await supabase.from('test_submissions').insert({
      test_id: testData.id,
      student_id: user?.id,
      student_answers: answers,
      total_score: score
    });

    setIsSubmitted(true);
    alert(`Test Submitted! You scored: ${score} out of ${testData.total_questions * 4}`);
  };

  if (!testData) {
    return <div className="p-8 text-white font-mono">Loading Secure Exam Environment...</div>;
  }

  // Construct the secure URL to the PDF in your Supabase bucket
  const pdfUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/authenticated/tests/${testData.pdf_path}`;

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-[#0a0d12] text-white rounded-lg overflow-hidden border border-gray-800">
      
      {/* LEFT SIDE: The PDF Viewer */}
      <div className="w-2/3 border-r border-gray-800 h-full bg-white">
        <iframe src={pdfUrl} className="w-full h-full border-0" />
      </div>

      {/* RIGHT SIDE: The Digital OMR */}
      <div className="w-1/3 p-6 overflow-y-auto h-full bg-[#11161d]">
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-xl font-bold text-emerald-500">Digital OMR</h2>
          <p className="text-sm text-gray-400 font-mono">Time: {testData.duration_minutes} min</p>
        </div>

        <div className="space-y-3 mb-8">
          {Array.from({ length: testData.total_questions }).map((_, i) => {
            const qNum = i + 1;
            return (
              <div key={qNum} className="flex items-center justify-between bg-[#0a0d12] p-3 rounded-lg border border-gray-800">
                <span className="font-mono text-gray-400 w-8 font-bold">{qNum}.</span>
                <div className="flex gap-2">
                  {['A', 'B', 'C', 'D'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleBubbleClick(qNum, opt)}
                      className={`w-10 h-10 rounded-full font-bold transition-all duration-200 ${
                        answers[qNum.toString()] === opt 
                          ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
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

        <Button 
          onClick={submitTest} 
          disabled={isSubmitted} 
          className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg font-bold shadow-lg"
        >
          {isSubmitted ? 'Exam Submitted ✓' : 'Submit Final Answers'}
        </Button>
      </div>

    </div>
  );
}