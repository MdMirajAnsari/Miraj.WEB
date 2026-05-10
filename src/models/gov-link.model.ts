export interface GovLink {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  department: string;
  scope: string;
  type: string;
  sensitive?: boolean;
  keywords: string[];
}

export interface EnrichedGovLink extends GovLink {
  addedIndex: number;
  isPinned: boolean;
}
