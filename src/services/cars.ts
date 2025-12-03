import { api } from '../config/api'

export type CarInfo = {
  plate: string
  name: string
  brand: string
  model: string
  year: string
  color: string
  fuelType: string
  engine: string
  chassis: string
  renavam: string
}

export const carsService = {
  async getByPlate(plate: string): Promise<CarInfo> {
    // Remove espaços e converte para maiúsculas
    const cleanPlate = plate.replace(/\s/g, '').toUpperCase()
    return api.get<CarInfo>(`/cars/plate/${encodeURIComponent(cleanPlate)}`)
  },
}

