export interface NewsItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO 8601
}

export interface Decision {
  case: string; // Ex: "HC 198765", "ADI 7432"
  type: string; // Ex: "Habeas Corpus", "Ação Direta de Inconstitucionalidade"
  outcome: string; // Ex: "Deferido", "Procedente", "Improcedente"
  date: string; // ISO 8601 (YYYY-MM-DD)
  sourceUrl: string;
  summary?: string; // Resumo da decisão (opcional)
}

export interface Minister {
  id: string; // slug: "alexandre-de-moraes"
  name: string;
  role: string; // "Ministro do STF" | "Ministra do STF"
  position: string; // "Presidente" | "Vice-Presidente" | "Decano" | "Ministra" | "Ministro"
  appointedBy: string;
  appointedAt: string; // ISO 8601 (YYYY-MM-DD)
  birthYear: number;
  birthState: string;
  education: string;
  photoUrl: string;
  bio: string;
  news: NewsItem[];
  decisions: Decision[];
}

export type MinisterSummary = Omit<Minister, 'news' | 'decisions' | 'bio'>;