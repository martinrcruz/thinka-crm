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
  type: number;
  inCharge: string;
  contactPlatform: string;
  description: string;
  projects: string;
  createdAt: string;
  createdBy: string | null;
  lastModifiedAt: string | null;
  lastModifiedBy: string | null;
  status: string;
}

export interface CustomerData {
  id: number;
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  contactNumber: string;
  workline: string;
  address: string;
  city: string;
  domain: string;
  type: number;
  inCharge: string;
  contactPlatform: string;
  description: string;
  status: string;
}

export interface CustomerStatus {
  id: number;
  code: string;
  name: string;
}