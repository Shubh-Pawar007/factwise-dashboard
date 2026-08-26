export interface Employee {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  performanceRating: number;
  projectsCompleted: number;
  location: string;
  hireDate: string;
  isActive: boolean;
  skills: string[];
  age: number;
  manager: string | null;
}
