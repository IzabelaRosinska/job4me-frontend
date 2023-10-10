export interface WorkerAccount {
  id: string;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  aboutMe?: string;
  photo?: string;
  interests?: string[];
  education?: string[];
  experience?: string[];
  skills?: string[];
  projects?: string[];
}


export interface LoginData{
    username: string;
    password: string;
}
