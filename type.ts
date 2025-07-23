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
  picture: {
    url: string;
    id: string;
  };
  creators: Creator[];
  projectUrl: string;
  createdAt: FirebaseDate | Date;
  updatedAt: FirebaseDate | Date;
}

export interface Project extends ProjectData {
  id: string;
}

export interface UserDetail {
  id: string;
  createdAt: FirebaseDate | Date;
  email: string;
  passwordHash: string;
  role: string;
  username: string;
  picture: {
    url: string;
    id: string;
  };
  emailVerified: boolean;
}

export interface UserDetailServer extends Omit<UserDetail, "createdAt"> {
  createdAt: Date;
}

export type LabCollection = "projects" | "users";
