export interface Quote {
  id: number;
  clientId: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  objectives: string;
  notes: string;
  startDate: string;
  endDate: string;
  domain: string;
  briefUrl: string;
  details: string;
  estimatedCost: number;
  estimatedTime: string;
}

export interface QuoteData {
  id: number;
  clientId: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  objectives: string;
  notes: string;
  startDate: string;
  endDate: string;
  domain: string;
  briefUrl: string;
  details: string;
  estimatedCost: number;
  estimatedTime: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  status: string;
}