import React from 'react';
import { ArrowRight, Upload, Search, CheckCircle, GraduationCap } from 'lucide-react';

interface HomePageProps {
  onStartAnalysis: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartAnalysis }) => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
            <GraduationCap className="w-4 h-4" />
            <span>3rd Year B.Tech Computer Science & Engineering Project</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Resume Analyzer & Job Matching Platform
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A beginner-friendly web application designed to help engineering students evaluate how well their resume aligns with technical job descriptions, uncover missing skills, and explore suitable entry-level job roles.
          </p>

          <div className="pt-4">
            <button
              onClick={onStartAnalysis}
              className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Analyze My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Three straightforward steps to evaluate your technical resume
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-slate-900 text-base">
                Upload Resume PDF
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select your resume in standard PDF format. You can also test with our pre-loaded sample B.Tech resume.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-slate-900 text-base">
                Paste Job Description
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Paste the requirements for an entry-level SDE role or use our sample campus recruitment job description.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-slate-900 text-base">
                View Match & Roadmap
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review your match score percentage, matched and missing skills, practical improvements, and 3 recommended job roles.
              </p>
            </div>
          </div>
        </div>

        {/* Project Details Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-xs text-slate-600 space-y-1.5">
          <p className="font-semibold text-slate-800">
            Project Overview:
          </p>
          <p>
            Developed for a 3rd-year college demonstration. The platform highlights how AI text analysis and semantic keyword matching can assist campus placement cells and candidates in bridging recruitment skill gaps.
          </p>
        </div>

      </div>
    </div>
  );
};
