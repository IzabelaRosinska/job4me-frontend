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
  id: number;
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
  id: number;
  description: string;
  useFavorite: boolean;
  isFavorite?: boolean;
  useDelete?: boolean;
  useApprove?: boolean;
  useGettingInside?: boolean;
}

export interface JobOffer {
  id?: number;
  offerName: string;
  employerId: number ;
  industries: string[];
  localizations: string[];
  employmentForms: string[];
  salaryFrom: number;
  salaryTo: number;
  contractTypes: string[];
  workingTime: string;
  levels: string[];
  requirements: string[];
  extraSkills?: string[];
  duties: string;
  description?: string;
}
