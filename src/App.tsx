/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationSection, AnalysisResult } from './types';
import { analyzeResume } from './services/api';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { AnalysisResultsPage } from './pages/AnalysisResultsPage';
import { JobRecommendationsPage } from './pages/JobRecommendationsPage';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAnalyze = async (
    file: File | null,
    base64: string | null,
    text: string,
    jobDescription: string
  ) => {
    setIsLoading(true);
    try {
      const result = await analyzeResume(file, base64, text, jobDescription);
      setAnalysisResult(result);
      setActiveSection('results');
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage onStartAnalysis={() => setActiveSection('analyzer')} />;

      case 'analyzer':
        return (
          <ResumeAnalyzerPage
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        );

      case 'results':
        if (!analysisResult) {
          return (
            <ResumeAnalyzerPage
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          );
        }
        return (
          <AnalysisResultsPage
            result={analysisResult}
            onAnalyzeAnother={() => setActiveSection('analyzer')}
            onViewRecommendations={() => setActiveSection('recommendations')}
          />
        );

      case 'recommendations':
        if (!analysisResult) {
          return (
            <ResumeAnalyzerPage
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          );
        }
        return (
          <JobRecommendationsPage
            result={analysisResult}
            onBackToResults={() => setActiveSection('results')}
            onAnalyzeAnother={() => setActiveSection('analyzer')}
          />
        );

      default:
        return <HomePage onStartAnalysis={() => setActiveSection('analyzer')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Simple Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        hasResults={Boolean(analysisResult)}
      />

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50/50">
        {renderSection()}
      </main>

      {/* Clean, Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-medium text-slate-700">
            AI Resume Analyzer & Job Matching Platform
          </p>
          <p>
            Developed for 3rd-Year B.Tech Computer Science & Engineering Project Demonstration
          </p>
        </div>
      </footer>
    </div>
  );
}
