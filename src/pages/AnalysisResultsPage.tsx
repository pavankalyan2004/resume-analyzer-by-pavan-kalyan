import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircle, AlertTriangle, ArrowRight, RefreshCw, Briefcase, Info } from 'lucide-react';

interface AnalysisResultsPageProps {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
  onViewRecommendations: () => void;
}

export const AnalysisResultsPage: React.FC<AnalysisResultsPageProps> = ({
  result,
  onAnalyzeAnother,
  onViewRecommendations,
}) => {
  const score = result.matchScore;

  const getScoreColor = (s: number) => {
    if (s >= 75) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (s >= 55) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Analysis Results
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Evaluation for: <span className="font-semibold text-slate-800">{result.resumeFileName}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAnalyzeAnother}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Analyze Another Resume</span>
            </button>
            <button
              onClick={onViewRecommendations}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>View Job Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Engine Transparency Notice */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Analysis Engine:</strong> {result.engineUsed}
              {result.note && ` — ${result.note}`}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {new Date(result.analyzedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Match Percentage Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Resume-to-Job Fit
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Match Percentage: <span className="text-blue-600">{score}%</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {score >= 75
                  ? 'Strong alignment with key requirements and technical qualifications.'
                  : score >= 55
                  ? 'Moderate alignment; addressing missing skills will improve candidate screening.'
                  : 'Noticeable technical skill gaps relative to the job requirements.'}
              </p>
            </div>

            <div className={`px-4 py-3 rounded-lg border text-center ${getScoreColor(score)}`}>
              <div className="text-2xl font-black">{score}%</div>
              <div className="text-[11px] font-medium uppercase tracking-wide">Overall Match</div>
            </div>
          </div>

          {/* Clean Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Skills Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Matched Skills */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Matched Skills ({result.matchedSkills.length})
              </h3>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                Found in Resume
              </span>
            </div>

            {result.matchedSkills.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No direct keyword overlap identified.</p>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {result.matchedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Missing Skills */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Missing or Underrepresented Skills ({result.missingSkills.length})
              </h3>
              <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                Required by Job
              </span>
            </div>

            {result.missingSkills.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No significant missing requirements found.</p>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {result.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Strengths Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Resume Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((str, index) => (
              <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exactly Three Practical Improvement Suggestions */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Three Practical Improvement Suggestions
          </h3>
          <div className="space-y-3">
            {result.improvementSuggestions.slice(0, 3).map((suggestion, index) => (
              <div
                key={index}
                className="p-3.5 rounded-md bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Job Recommendations */}
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-blue-900">Next Step: Explore Job Matches</h4>
            <p className="text-xs text-blue-700">
              View three recommended software engineering roles tailored to your identified skill profile.
            </p>
          </div>
          <button
            onClick={onViewRecommendations}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>View 3 Recommended Roles &rarr;</span>
          </button>
        </div>

      </div>
    </div>
  );
};
