import {Observable} from "rxjs";

export interface EmployeeAccount {
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

export interface OrganizerAccount {
  id: number;
  name: string;
  description: string;
  contactEmail: string;
  telephone: string;
}

export interface PaymentCheckout {
  url: string
}

export interface JobFair {
  id: number;
  name: string;
  organizerId: number;
  dateStart: string;
  dateEnd: string;
  address: string;
  description: string;
  displayDescription: string;
  photo?: string;
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

export interface PasswordChange{
  password: string;
  matchingPassword: string;
  token?: string;
}

export interface ItemInsideList{
  route: string;
  image: string;
  name: string;
  id: number;
  displayDescription: string;
  ListButtonsOptions: ListButtonsOptions;
}

export interface ForListBackend {
  id: number;
  name: string;
  displayDescription: string;
  photo?: string;
  isSaved?: boolean;
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
  isActive?: boolean;
}


export interface ApiResponse<T> {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: { page: T };
}

export interface Page<T> {
  content: T[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    unpaged: boolean,
    paged: boolean
  },
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  numberOfElements: number,
  first: boolean,
  empty: boolean
}



export interface idNameListElement {
    id: number;
    name: string;
}

export interface PaginationUse<T> {
  id: string,
  active: boolean,
  pageSize: number,
  pageIndex: number,
  length: number,
  route: string,
  routeToElement: string,
  ifGet: boolean,
  params?: [string,string][],
  state: Observable<Page<T>>,
  class?: string,
  list: ItemInsideList[],
  loading: boolean,
  listButtonsOptions?: ListButtonsOptions,
  filters?: JobOfferFilterDto | null
}

export interface ListButtonsOptions {
  useSaved: boolean;
  isSaved: boolean;
  useDelete: boolean;
  useApprove: boolean;
  useGettingInside: boolean;
}

export interface ParticipationRequest{
  id: number,
  jobFairId: number,
  jobFairName: string,
  employerId: number,
  employerCompanyName: string,
  isAccepted: boolean
}

export interface JobOfferFilterDto {
  cities?: string[],
  employmentFormNames?: string[],
  levelNames?: string[],
  contractTypeNames?: string[],
  salaryFrom?: number,
  salaryTo?: number,
  industryNames?: string[],
  offerName?: string
}


export enum FiliterType {
  cities = "cities",
  employmentFormNames = "employmentFormNames",
  levelNames = "levelNames",
  industryNames = "industryNames",
  contractTypeNames = "contractTypeNames",
  salaryFrom = "salaryFrom",
  salaryTo = "salaryTo",
  offerName = "offerName",
  jobFairName = "jobFairName",
  employerCompanyName = "employerCompanyName",
}

export interface PdfDto {
  encodedPdf: ArrayBuffer;
}

export interface QrDto {
  encodedQr: ArrayBuffer;
}
