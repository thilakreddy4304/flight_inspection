// // // Flight related types
// // export interface Flight {
// //   id: string;
// //   flightNumber: string;
// //   aircraft: string;
// //   departureTime: string;
// //   arrivalTime: string;
// //   origin: string;
// //   destination: string;
// //   status: FlightStatus;
// //   lastInspectionDate?: string;
// // }

// // export type FlightStatus = 'scheduled' | 'in-air' | 'landed' | 'cancelled' | 'delayed';

// // // Inspection related types
// // export interface Inspection {
// //   id: string;
// //   flightId: string;
// //   inspectionDate: string;
// //   inspectorId: string;
// //   status: InspectionStatus;
// //   findings: Finding[];
// //   notes?: string;
// // }

// // export type InspectionStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

// // export interface Finding {
// //   id: string;
// //   category: FindingCategory;
// //   description: string;
// //   severity: 'low' | 'medium' | 'high' | 'critical';
// //   status: 'open' | 'in-progress' | 'resolved';
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // export type FindingCategory = 
// //   | 'safety' 
// //   | 'mechanical' 
// //   | 'electrical' 
// //   | 'structural' 
// //   | 'documentation' 
// //   | 'other';

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export type UserRole = 'admin' | 'inspector' | 'engineer' | 'viewer';

// Authentication related types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// export interface PaginatedResponse<T> {
//   data: T[];
//   page: number;
//   perPage: number;
//   totalItems: number;
//   totalPages: number;
// }

// // Dashboard view types
export type DashboardView = 'home' | 'inspections' | 'workOrderManagement' | 'HardwareSenseAssets' | 'AircraftAssets' | 'collaborate' | 'settings' | 'ContactSupport' | 'profile'; 