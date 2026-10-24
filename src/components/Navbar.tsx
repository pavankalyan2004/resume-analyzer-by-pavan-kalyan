import React from 'react';
import { NavigationSection } from '../types';
import { FileText, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
  hasResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  hasResults,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight block">
                AI Resume Analyzer & Job Matching Platform
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:block">
                3rd Year B.Tech CSE College Project
              </span>
            </div>
          </div>

          {/* Simple Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeSection === 'home'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('analyzer')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeSection === 'analyzer'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Resume Analyzer
            </button>

            <button
              onClick={() => onNavigate('results')}
              disabled={!hasResults}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 ${
                activeSection === 'results'
                  ? 'bg-blue-50 text-blue-700'
                  : hasResults
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              Analysis Results
              {hasResults && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 inline" />}
            </button>

            <button
              onClick={() => onNavigate('recommendations')}
              disabled={!hasResults}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeSection === 'recommendations'
                  ? 'bg-blue-50 text-blue-700'
                  : hasResults
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              Job Recommendations
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
