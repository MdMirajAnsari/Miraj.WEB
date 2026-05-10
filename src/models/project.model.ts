export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags?: ProjectTag[];
  image: string;
  repo?: string;
  demo: string;
}
