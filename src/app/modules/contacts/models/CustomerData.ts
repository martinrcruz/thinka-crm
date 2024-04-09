export interface CustomerData {
  id: number;
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  city: string;
  contactPlatform: string;
  budget: number;
  projectDescription: string;
  expectedDate: string;
  deliveryStatus: string;
  workLine: string;
  inCharge: string;
  createdAt: string;
  createdBy: string | null;
  lastModifiedAt: string | null;
  lastModifiedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  status: string;
}