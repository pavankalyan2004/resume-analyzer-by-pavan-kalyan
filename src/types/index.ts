export type NavigationSection = 'home' | 'analyzer' | 'results' | 'recommendations';

export interface RecommendedJob {
  title: string;
  requiredSkills: string[];
  matchReason: string;
}

export interface RoadmapStep {
  step: string;
  title: string;
  description: string;
  keySkills: string[];
}

export interface AnalysisResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvementSuggestions: string[]; // exactly 3 practical suggestions
  recommendedJobs: RecommendedJob[]; // exactly 3 relevant job roles
  roadmap: RoadmapStep[];
  engineUsed: string;
  note?: string;
  resumeFileName: string;
  analyzedAt: string;
}
