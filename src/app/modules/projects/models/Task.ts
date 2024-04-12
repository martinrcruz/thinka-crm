export interface Task {
  id: number;
  projectId: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  taskStatus: string;
  inCharge: string;
  priority: string;
  comments: string;
  startDate: string;
  endDate: string;
  tags: string;
  files: string[];
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

export interface TaskData {
  id: number;
  projectId: number;
  title: string;
  resume: string;
  taskStatus: string;
  inCharge: string;
  priority: string;
  startDate: string;
  endDate: string;
}

export interface TaskDetail {
  id: number;
  projectId: number;
  title: string;
  resume: string;
  description: string;
  objectives: string;
  taskStatus: string;
  inCharge: string;
  priority: string;
  comments: string;
  startDate: string;
  endDate: string;
  tags: string;
  files: string[];
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}