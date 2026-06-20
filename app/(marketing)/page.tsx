import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-900/50 bg-emerald-900/20 text-emerald-400 text-sm font-semibold mb-8 tracking-wide uppercase">
          Admissions Open for JEE 2027
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Engineering Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Ultimate Success.
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-10">
          Bokaro's premier coaching institute. We combine elite faculty with a national-grade digital learning ecosystem to guarantee your rank in JEE & SAT.
        </p>
        <div className="flex gap-4">
          <Link href="#courses" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Explore Courses
          </Link>
          <button className="px-8 py-4 bg-[#11161d] hover:bg-gray-800 border border-gray-700 text-white rounded-lg font-bold text-lg transition-all">
            Book Free Counseling
          </button>
        </div>
      </section>

      {/* Feature Section: The Digital Edge */}
      <section id="about" className="w-full bg-[#11161d] border-y border-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">The Aimers Digital Edge</h2>
            <p className="text-gray-400 mt-4">Why we outperform traditional coaching centers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a0d12] p-8 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-xl font-bold mb-2">Secure Video Library</h3>
              <p className="text-gray-400 text-sm">Missed a class? Watch fully encrypted, distraction-free lecture recordings on your student dashboard.</p>
            </div>
            <div className="bg-[#0a0d12] p-8 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Split-Screen OMR Tests</h3>
              <p className="text-gray-400 text-sm">Take full-length mock exams on our proprietary digital engine with instant auto-grading analytics.</p>
            </div>
            <div className="bg-[#0a0d12] p-8 rounded-xl border border-gray-800">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Digital DPPs</h3>
              <p className="text-gray-400 text-sm">Download daily practice problems and track your progress in real-time through the ERP.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}