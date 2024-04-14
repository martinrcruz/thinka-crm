import { Project } from "../../projects/models/Project";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string;
  workline: string;
  domain: string;
  clientStatus: string;
  inCharge: string;
  contactPlatform: string;
  description: string;
  projects: Project[];
  createdAt: string;
  createdBy: string | null;
  lastModifiedAt: string | null;
  lastModifiedBy: string | null;
}

export interface CustomerData {
  id: number;
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string;
  workline: string;
  domain: string;
  clientStatus: string;
  inCharge: string;
  contactPlatform: string;
  description: string;
  projects: Project[];
}

export interface CustomerStatus {
  id: number;
  code: string;
  name: string;
}