
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  features: string[];
  featured?: boolean;
  stock: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Sale {
  id: string;
  products: CartItem[];
  total: number;
  date: string;
  customer_name?: string;
  customer_email?: string;
  status: 'completed' | 'pending' | 'cancelled';
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
