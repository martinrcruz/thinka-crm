import { Customer } from "../../contacts/models/Customer";

export interface Quote {
  id: number;
  customer: Customer;
  title: string;
  resume: string;
  description: string;
  startDate: string;
  endDate: string;
  quoteStatus: string;
  domain: string;
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
  customer: Customer;
  title: string;
  resume: string;
  description: string;
  startDate: string;
  endDate: string;
  quoteStatus: string;
  domain: string;
  estimatedCost: number;
  estimatedTime: string;
  inCharge: string;
}

export interface QuoteStatus {
  id: number;
  code: string;
  name: string;
}