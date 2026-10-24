import React from 'react';
import { AnalysisResult } from '../types';
import { Briefcase, ArrowLeft, RefreshCw, CheckCircle2, BookOpen } from 'lucide-react';

interface JobRecommendationsPageProps {
  result: AnalysisResult;
  onBackToResults: () => void;
  onAnalyzeAnother: () => void;
}

export const JobRecommendationsPage: React.FC<JobRecommendationsPageProps> = ({
  result,
  onBackToResults,
  onAnalyzeAnother,
}) => {
  const jobs = result.recommendedJobs.slice(0, 3);
  const roadmap = result.roadmap.slice(0, 3);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Recommended Job Roles
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Three relevant roles matching your verified skills, plus a simple skill-development roadmap.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToResults}
              className="px-3.5 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Results</span>
            </button>
            <button
              onClick={onAnalyzeAnother}
              className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Analyze Another Resume</span>
            </button>
          </div>
        </div>

        {/* Section 1: Three Recommended Job Roles */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Three Matched Job Roles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                    Match Role #{index + 1}
                  </span>
                  
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {job.title}
                  </h3>

                  <div className="text-xs text-slate-600 leading-relaxed">
                    <strong>Why it matches:</strong> {job.matchReason}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                    Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Simple Skill-Development Roadmap */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Simple Skill-Development Roadmap</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              A 3-step prioritized guide to bridge missing technical skills before campus placement drives.
            </p>
          </div>

          <div className="space-y-4">
            {roadmap.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium font-mono">
                    {step.step}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 pl-8 leading-relaxed">
                  {step.description}
                </p>

                {step.keySkills && step.keySkills.length > 0 && (
                  <div className="pl-8 pt-1 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-medium text-slate-500">Focus Areas:</span>
                    {step.keySkills.map((sk, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2 py-0.5 rounded bg-white text-slate-700 text-[11px] font-medium border border-slate-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onBackToResults}
            className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors"
          >
            &larr; Back to Results
          </button>
          <button
            onClick={onAnalyzeAnother}
            className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            Analyze Another Resume
          </button>
        </div>

      </div>
    </div>
  );
};
