export interface WorkerAccount {
  id: string;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  aboutMe?: string;
  interests?: string;
  education?: string[];
  experience?: string[];
  skills?: string[];
  projects?: string[];
}

export interface EmployerAccount {
  id: string;
  companyName: string;
  description: string;
  displayDescription: string;
  telephone: string;
  email: string;
  photo?: string;
  addres?:  string;
}

export interface LoginData{
  username: string;
  password: string;
}

export enum Role {
  Employee = 'EMPLOYEE',
  Employer = 'EMPLOYER',
  Organizer  = 'ORGANIZER',
  Admin = 'ADMIN'
}

export interface RegisterData{
  username: string;
  role: string;
  password: string;
  matchingPassword: string;
}



