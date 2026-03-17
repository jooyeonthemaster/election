export interface SloganScores {
  memorability: number;
  voterResonance: number;
  differentiation: number;
  authenticity: number;
  versatility: number;
  legalSafety: number;
}

export interface SloganOption {
  id: number;
  mainSlogan: string;
  subSlogan?: string;
  approach: string;
  variations: {
    sns: string;
    poster: string;
    youth: string;
    senior: string;
  };
  reasoning: {
    targetAlignment: string;
    differentiation: string;
    emotionalAppeal: string;
    memorability: string;
  };
  scores: SloganScores;
  riskAlerts?: string[];
}

export interface FinalPackage {
  mainSlogan: string;
  tagline?: string;
  strategicRationale: {
    positioning: string;
    targetVoters: string[];
    competitiveDiff: string;
    toneJustification: string;
  };
  variations: { context: string; slogan: string; usage: string }[];
  applicationGuide: {
    dos: string[];
    donts: string[];
    bestPractices: string[];
  };
  voterSegmentAppeal: { segment: string; appealScore: number; reasoning: string }[];
  legalCompliance: { status: string; checks: string[] };
  scores: SloganScores;
}

export interface RefineMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
