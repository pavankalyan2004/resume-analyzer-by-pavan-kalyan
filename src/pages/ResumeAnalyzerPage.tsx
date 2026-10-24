import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTION, SAMPLE_RESUME_TEXT } from '../services/api';

interface ResumeAnalyzerPageProps {
  onAnalyze: (file: File | null, base64: string | null, text: string, jd: string) => Promise<void>;
  isLoading: boolean;
}

export const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({
  onAnalyze,
  isLoading,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.toLowerCase().endsWith('.pdf')) {
      setValidationError('Please select a file in PDF format (.pdf).');
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setValidationError('PDF file size exceeds 10MB limit.');
      return;
    }

    setFile(selected);

    // Convert to base64 for API transmission
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extract base64 portion
      const base64Data = result.split(',')[1] || result;
      setFileBase64(base64Data);
    };
    reader.readAsDataURL(selected);
  };

  const handleUseSampleResume = () => {
    setValidationError(null);
    setFile(null);
    setFileBase64(null);
    setResumeText(SAMPLE_RESUME_TEXT);
  };

  const handleUseSampleJob = () => {
    setValidationError(null);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!file && (!resumeText || resumeText.trim().length === 0)) {
      setValidationError('Please upload a PDF resume or click "Use Sample B.Tech Resume" to proceed.');
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      setValidationError('Please paste a target job description (minimum 20 characters).');
      return;
    }

    await onAnalyze(file, fileBase64, resumeText, jobDescription);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Resume Analyzer
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Upload your resume in PDF format and paste the job description to calculate your match score.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Validation Error Message */}
          {validationError && (
            <div className="p-3.5 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {/* 1. Resume Upload */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-900">
                1. Upload Resume (PDF Format) <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleUseSampleResume}
                className="text-xs text-blue-600 hover:text-blue-700 underline font-medium cursor-pointer"
              >
                Use Sample B.Tech Resume
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-lg p-6 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/30"
            >
              {file ? (
                <div className="flex items-center justify-center gap-2 text-slate-900 text-sm font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
              ) : resumeText ? (
                <div className="flex items-center justify-center gap-2 text-slate-900 text-sm font-medium">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Loaded: <strong>Pavan_FullStack_Resume (Sample Profile)</strong></span>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-700 font-medium">
                    Click to browse and select a PDF file
                  </p>
                  <p className="text-xs text-slate-500">
                    Maximum size: 10MB • Only .pdf supported
                  </p>
                </div>
              )}
            </div>

            {(file || resumeText) && (
              <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Resume ready for evaluation
              </p>
            )}
          </div>

          {/* 2. Job Description Input */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <label htmlFor="jd-textarea" className="block text-sm font-semibold text-slate-900">
                2. Target Job Description <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleUseSampleJob}
                className="text-xs text-blue-600 hover:text-blue-700 underline font-medium cursor-pointer"
              >
                Insert Sample SDE Job Description
              </button>
            </div>

            <textarea
              id="jd-textarea"
              rows={8}
              value={jobDescription}
              onChange={(e) => {
                setValidationError(null);
                setJobDescription(e.target.value);
              }}
              placeholder="Paste the job description, required skills, and candidate eligibility criteria here..."
              className="w-full p-3 rounded-md border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono text-xs leading-relaxed"
            />

            <p className="text-xs text-slate-500">
              Tip: Include role title, qualifications, and programming languages for higher accuracy.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Resume against Job Description...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
