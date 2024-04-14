import { Tag } from "src/app/shared/models/Tag";
import { Task } from "./Task";
import { ThinkaFile } from "src/app/shared/models/ThinkaFile";
export interface Project {
  id: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  domain: string;
  priority: string;
  tags: Tag[];
  files: ThinkaFile[];
  image: ThinkaFile;
  inCharge: string;
  tasks: Task[];
  startDate: string;
  endDate: string;
  projectStatus: string;
  createdAt: string;
  createdBy: string | null;
  lastModifiedAt: string | null;
  lastModifiedBy: string | null;
  status: string;
}

export interface ProjectData {
  id: string;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  domain: string;
  priority: string;
  tags: Tag[];
  files: ThinkaFile[];
  image: ThinkaFile;
  inCharge: string;
  startDate: string;
  endDate: string;
  projectStatus: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  domain: string;
  priority: string;
  tags: Tag[];
  files: ThinkaFile[];
  image: ThinkaFile;
  inCharge: string;
  tasks: Task[];
  startDate: string;
  endDate: string;
  projectStatus: string;
}