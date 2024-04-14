import { Customer } from "../../contacts/models/Customer";
import { Project } from "../../projects/models/Project";
import { Quote } from "./Quote";

export interface Sale {
  id: number;
  quote: Quote | null;
  customer: Customer | null;
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
  project: Project[];
  paymentType: string;
  bruteCost: number;
  iva: number;
  paymentStatus: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

export interface SaleData {
  id: number;
  quote: Quote | null;
  customer: Customer | null;
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
  project: Project[];
  paymentType: string;
  bruteCost: number;
  iva: number;
  paymentStatus: string;
  createdAt: string;
  createdBy: string;
}

export interface SaleStatus {
  id: number;
  code: string;
  name: string;
}