export interface PolicyQuestion {
  id: number;
  category: string;
  categoryIcon: React.ElementType;
  question: string;
  description: string;
  proArgs: string[];
  conArgs: string[];
}

export interface Candidate {
  name: string;
  party: string;
  district: string;
  role: string;
  color: string;
  positions: number[];
  convictionScore: number;
  convictionLabel: string;
}

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
}

export interface Step {
  step: string;
  title: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
  icon: React.ElementType;
  description: string;
}
