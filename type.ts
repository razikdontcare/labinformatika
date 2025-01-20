export interface FirebaseDate {
  _seconds: number;
  _nanoseconds: number;
}

export interface Creator {
  name: string;
  nim: string;
}

export interface ProjectData {
  name: string;
  description: string;
  picture: string;
  creators: Creator[];
  projectUrl: string;
  createdAt: FirebaseDate;
  updatedAt: FirebaseDate;
}

export interface Project extends ProjectData {
  id: string;
}
