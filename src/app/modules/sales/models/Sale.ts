export interface Sale {
  id: number;
  quoteId: number | null;
  clientId: number;
  clientName: string;
  title: string;
  resume: string;
  description: string;
  startDate: string;
  endDate: string;
  domain: string;
  briefUrl: string;
  cost: number;
  duration: string;
  inCharge: string;
  projectId: number;
  projectStatus: string;
  paymentType: string;
  bruteCost: number;
  iva: number;
  total: number;
  paymentStatus: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

export interface SaleData {
  id: number;
  clientName: string;
  title: string;
  resume: string;
  startDate: string;
  endDate: string;
  domain: string;
  briefUrl: string;
  cost: number;
  duration: string;
  inCharge: string;
  total: number;
  paymentStatus: string;
  createdAt: string;
  createdBy: string;
}

export interface SaleStatus {
  id: number;
  code: string;
  name: string;
}