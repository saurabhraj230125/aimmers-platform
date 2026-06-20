import Link from 'next/link';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  // Local SEO Schema for Google Search Dominance in Bokaro
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "The Aimers Institute",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bokaro Steel City",
      "addressRegion": "Jharkhand",
      "addressCountry": "IN"
    },
    "description": "Premier coaching institute in Bokaro for JEE, SAT, and Board exam preparation.",
    "url": "https://aimersinstitute.com",
    "telephone": "+91-9999999999" // Update with your actual number
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white selection:bg-emerald-500/30">
      {/* Invisible SEO Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Modern Glassmorphism Navigation Bar */}
      <nav className="fixed w-full z-50 bg-[#0a0d12]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            AIMERS
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="#about" className="hover:text-emerald-400 transition-colors">About Us</Link>
            <Link href="#courses" className="hover:text-emerald-400 transition-colors">Courses</Link>
            <Link href="#faculty" className="hover:text-emerald-400 transition-colors">Faculty</Link>
          </div>

          {/* ERP Dropdown */}
          <div className="relative group">
            <button className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-md font-bold transition-colors flex items-center gap-2">
              ERP Login <span className="text-xs">▼</span>
            </button>
            
            {/* Dropdown Menu (Appears on Hover) */}
            <div className="absolute right-0 mt-2 w-56 bg-[#11161d] border border-gray-800 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden flex flex-col z-50">
              <Link href="/dashboard" className="px-4 py-4 hover:bg-gray-800 text-sm text-gray-200 border-b border-gray-800 flex items-center gap-3">
                <span className="text-lg">🎓</span> Student Portal
              </Link>
              <Link href="/admin" className="px-4 py-4 hover:bg-red-900/20 text-sm text-red-400 font-medium flex items-center gap-3">
                <span className="text-lg">⚙️</span> Admin Command
              </Link>
            </div>
          </div>

        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}