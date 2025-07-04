
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Client' | 'Admin';
  push_subscription?: any;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_in_minutes: number;
}

export interface Appointment {
  id: string;
  client_id: string;
  start_time: string;
  end_time: string;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  services_value: number;
  booking_fee: number;
  total_value: number;
  external_payment_id?: string;
  payment_method?: 'PIX' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro';
  services: Service[];
  client?: User;
}

export interface AppointmentService {
  appointment_id: string;
  service_id: string;
}

export interface AdminWorkingHours {
  day_of_week: number; // 1-7
  start_time: string;
  end_time: string;
}

export interface ScheduleBlock {
  start_time: string;
  end_time: string;
  reason?: string;
}

export interface DashboardStats {
  totalSales: number;
  totalAppointments: number;
  monthlyRevenue: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  productsSold: number;
  averageTicket: number;
}

export interface PaymentMethodStats {
  method: string;
  amount: number;
  percentage: number;
  count: number;
}
