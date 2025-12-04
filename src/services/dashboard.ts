import { api } from '../config/api'

export type StockStatistics = {
  totalProducts: number
  totalStock: number
  activeProducts: number
  inactiveProducts: number
  totalStockValue: number
  stockByCategory: Record<string, number>
}

export type SalesStatistics = {
  totalOrders: number
  totalItemsSold: number
  totalRevenue: number
  averageOrderValue: number
  ordersByStatus: Record<string, number>
  revenueByMonth: Record<string, number>
}

export type DashboardData = {
  stockStatistics: StockStatistics
  salesStatistics: SalesStatistics
}

export const dashboardService = {
  async getDashboard(): Promise<DashboardData> {
    return api.get<DashboardData>('/dashboard')
  },
}

