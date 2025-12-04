import React, { useState } from 'react';
import { generateYouTubeStrategy } from './services/geminiService';
import { AutomationResponse } from './types';
import { Dashboard } from './components/Dashboard';
import { Loader2, Sparkles, Youtube, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AutomationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateYouTubeStrategy(niche);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setNiche('');
    setError(null);
  };

  if (data) {
    return <Dashboard data={data} niche={niche} onReset={reset} />;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-red-600 rounded-2xl mb-6 shadow-lg shadow-red-900/50">
             <Youtube size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Tube<span className="text-red-500">Flow</span>
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Your Complete AI YouTube Automation System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-[#181818] rounded-xl border border-gray-700 shadow-2xl p-2">
              <SearchIcon className="ml-4 text-gray-500" />
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Enter your niche (e.g. 'Urban Gardening', 'AI News')..."
                className="w-full bg-transparent border-none text-white text-lg px-4 py-4 focus:ring-0 focus:outline-none placeholder-gray-600"
                autoFocus
              />
              <button 
                type="submit" 
                disabled={loading || !niche.trim()}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate System</span>
                    <Sparkles size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Trend Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Scriptwriting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>SEO & Monetization</span>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-8 p-4 bg-red-900/20 border border-red-800/50 rounded-xl text-red-200 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
      
      <footer className="absolute bottom-6 text-gray-600 text-xs">
         Powered by Gemini AI • High Velocity YouTube Automation
      </footer>
    </div>
  );
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg 
    className={`w-6 h-6 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default App;