import { ThinkaFile } from "src/app/shared/models/ThinkaFile";
import { Tag } from "src/app/shared/models/Tag";

export interface Task {
  id: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  comments: string;
  taskStatus: string;
  inCharge: string;
  priority: string;
  startDate: string;
  endDate: string;
  tags: Tag[];
  files: ThinkaFile[];
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

export interface TaskData {
  id: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  comments: string;
  taskStatus: string;
  inCharge: string;
  priority: string;
  startDate: string;
  endDate: string;
  tags: Tag[];
  files: ThinkaFile[];
}

export interface TaskDetail {
  id: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  comments: string;
  taskStatus: string;
  inCharge: string;
  priority: string;
  startDate: string;
  endDate: string;
  tags: Tag[];
  files: ThinkaFile[];
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}