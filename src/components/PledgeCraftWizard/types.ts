export interface Scores {
  feasibility: number;
  budgetEfficiency: number;
  voterAppeal: number;
  uniqueness: number;
  impact: number;
}

export interface Policy {
  id: number;
  title: string;
  subtitle: string;
  approach: string;
  keyPoints: string[];
  budget: string;
  timeline: string;
  expectedImpact: string;
  scores: Scores;
}

export interface FinalPolicy {
  title: string;
  slogan: string;
  background: string;
  objective: string;
  plans: { phase: string; content: string; budget: string }[];
  totalBudget: string;
  expectedEffects: string[];
  targetVoters: string;
  differentiator: string;
  scores: Scores;
}

export interface RefineMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
