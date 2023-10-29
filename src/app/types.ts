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
  address?:  string;
}

export interface LoginData {
  username: string;
  password: string;
}

export enum Role {
  Employee = 'EMPLOYEE',
  Employer = 'EMPLOYER',
  Organizer = 'ORGANIZER',
  Admin = 'ADMIN'
}

export interface RegisterData {
  username: string;
  role: string;
  password: string;
  matchingPassword: string;
}

export interface ItemInsideList{
  route: string;
  image: string;
  name: string;
  id: string;
  description: string;
  useFavorite: boolean;
  isFavorite?: boolean;
  useDelete?: boolean;
  useApprove?: boolean;
  useGettingInside?: boolean;
}

export interface JobOffer {
  id: string;
  offerName: string;
  company: EmployerAccount ;
  industries: string[];
  localizations: string[];
  forms: string[];
  salaryFrom: number;
  salaryTo: number;
  contractType: string[];
  workingTime: string;
  level: string[];
  requirements: string[];
  extraSkills?: string[];
  duties: string;
  description?: string;
}
