export interface Sale {
  id: number;
  clientId: string;
  quoteId: string;
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
  inCharge: string;
  projectId: string;
}

export interface SaleData {
  id: number;
  clientId: string;
  quoteId: string;
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
  inCharge: string;
  projectId: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  status: string;
}