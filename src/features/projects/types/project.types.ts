export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateProjectDto {
  name: string;
  description: string;
}