import { Task } from "./Task";

export interface Project {
  id: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  domain: string;
  priority: string;
  tags: string;
  inCharge: string;
  tasks: Task[];
  files: string[];
  image: string;
  startDate: string;
  endDate: string;
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
  tags: string;
  inCharge: string;
  tasks: Task[];
  files: string[];
  image: string;
  status: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  domain: string;
  priority: string;
  tags: string;
  inCharge: string;
  startDate: string;
  endDate: string;
    tasks: Task[];
  files: string[];
  image: string;
  status: string;
}