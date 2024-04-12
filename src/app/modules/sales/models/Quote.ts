export interface Quote {
  id: number;
  clientId: number;
  clientName: string;
  title: string;
  resume: string;
  description: string;
  startDate: string;
  endDate: string;
  domain: string;
  quoteStatus: string;
  estimatedCost: number;
  estimatedTime: string;
  inCharge: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

export interface QuoteData {
  id: number;
  clientId: number;
  clientName: string;
  title: string;
  resume: string;
  description: string;
  startDate: string;
  endDate: string;
  domain: string;
  quoteStatus: string;
  estimatedCost: number;
  estimatedTime: string;
  inCharge: string;
}

export interface QuoteStatus {
  id: number;
  code: string;
  name: string;
}