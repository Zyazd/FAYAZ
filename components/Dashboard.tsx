import React, { useState } from 'react';
import { AutomationResponse, TabView } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { 
  BarChart2, 
  FileText, 
  Film, 
  Search, 
  Image as ImageIcon, 
  Zap, 
  UploadCloud, 
  DollarSign,
  Copy,
  Check
} from 'lucide-react';

interface DashboardProps {
  data: AutomationResponse;
  niche: string;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, niche, onReset }) => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.ANALYSIS);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { id: TabView.ANALYSIS, label: 'Niche Analysis', icon: BarChart2 },
    { id: TabView.BLUEPRINT, label: 'Video Blueprint', icon: Film },
    { id: TabView.SCRIPT, label: 'Scriptwriting', icon: FileText },
    { id: TabView.SEO, label: 'SEO Metadata', icon: Search },
    { id: TabView.THUMBNAILS, label: 'Thumbnails', icon: ImageIcon },
    { id: TabView.SHORTS, label: 'Shorts Content', icon: Zap },
    { id: TabView.STRATEGY, label: 'Upload Strategy', icon: UploadCloud },
    { id: TabView.MONETIZATION, label: 'Monetization', icon: DollarSign },
  ];

  const activeMenuItem = menuItems.find(i => i.id === activeTab);
  const ActiveIcon = activeMenuItem?.icon;

  const renderContent = () => {
    let content = '';
    switch (activeTab) {
      case TabView.ANALYSIS: content = data.nicheAnalysis; break;
      case TabView.BLUEPRINT: content = data.videoBlueprint; break;
      case TabView.SCRIPT: content = data.script; break;
      case TabView.SEO: content = data.seo; break;
      case TabView.THUMBNAILS: content = data.thumbnails; break;
      case TabView.SHORTS: content = data.shorts; break;
      case TabView.STRATEGY: content = data.uploadStrategy; break;
      case TabView.MONETIZATION: content = data.monetization; break;
    }

    return (
      <div className="bg-[#1f1f1f] border border-gray-800 rounded-xl p-6 shadow-xl min-h-[60vh] relative">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => handleCopy(content)}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-sm transition-colors border border-gray-700"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <div className="prose prose-invert max-w-none">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-[#121212] border-b border-gray-800 p-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 p-2 rounded-lg">
            <Film className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">TubeFlow</h1>
            <p className="text-xs text-gray-500 font-medium">AUTOMATION SYSTEM</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-xs text-gray-400 uppercase tracking-wider">Active Niche</span>
             <span className="text-sm font-semibold text-white">{niche}</span>
          </div>
          <button 
            onClick={onReset}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-gray-700"
          >
            New Niche
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-[#121212] border-r border-gray-800 flex-shrink-0 overflow-y-auto hidden md:block">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-red-600/10 text-red-500 border border-red-600/20' 
                    : 'text-gray-400 hover:bg-[#1f1f1f] hover:text-white'
                }`}
              >
                <item.icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Nav (Top Scroll) */}
        <div className="md:hidden w-full bg-[#121212] border-b border-gray-800 overflow-x-auto whitespace-nowrap p-2 flex space-x-2 fixed top-[73px] z-10">
           {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeTab === item.id 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                <item.icon size={14} />
                <span>{item.label}</span>
              </button>
            ))}
        </div>

        {/* Content Area */}
        <main className="flex-1 bg-[#0f0f0f] p-4 md:p-8 overflow-y-auto pt-16 md:pt-8">
          <div className="max-w-4xl mx-auto">
             <div className="mb-6 flex items-center space-x-3">
                <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
                  {ActiveIcon && <ActiveIcon size={24} />}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {activeMenuItem?.label}
                </h2>
             </div>
             {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};