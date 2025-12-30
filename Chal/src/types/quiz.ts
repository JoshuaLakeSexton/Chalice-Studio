export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  archetype: Archetype;
  designPrinciple: string;
}

export type Archetype =
  | 'hero'
  | 'sage'
  | 'magician'
  | 'innocent'
  | 'explorer'
  | 'ruler'
  | 'creator';

export interface QuizResult {
  primaryArchetype: Archetype;
  secondaryArchetype: Archetype;
  score: Record<Archetype, number>;
}

export interface ArchetypeProfile {
  name: string;
  title: string;
  arthurian: string;
  description: string;
  designApproach: string;
  strengths: string[];
  quest: string;
}
