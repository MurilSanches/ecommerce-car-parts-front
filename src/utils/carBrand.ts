/**
 * Mapeamento do displayName (retornado pelo backend) para o enum CarBrand
 * Baseado no enum do backend: CarBrand.displayName -> CarBrand.name
 */
const DISPLAY_NAME_TO_ENUM: Record<string, string> = {
  'Volkswagen': 'VOLKSWAGEN',
  'Fiat': 'FIAT',
  'Ford': 'FORD',
  'Chevrolet': 'CHEVROLET',
  'Renault': 'RENAULT',
  'Toyota': 'TOYOTA',
  'Honda': 'HONDA',
  'Hyundai': 'HYUNDAI',
  'Nissan': 'NISSAN',
  'Peugeot': 'PEUGEOT',
  'Citroën': 'CITROEN',
  'Citroen': 'CITROEN',
  'Mercedes-Benz': 'MERCEDES_BENZ',
  'BMW': 'BMW',
  'Audi': 'AUDI',
  'Volvo': 'VOLVO',
  'Jeep': 'JEEP',
  'Mitsubishi': 'MITSUBISHI',
  'Kia': 'KIA',
  'Suzuki': 'SUZUKI',
  'Mazda': 'MAZDA',
  'Subaru': 'SUBARU',
  'Land Rover': 'LAND_ROVER',
  'Jaguar': 'JAGUAR',
  'Porsche': 'PORSCHE',
  'Ferrari': 'FERRARI',
  'Lamborghini': 'LAMBORGHINI',
  'Maserati': 'MASERATI',
  'Alfa Romeo': 'ALFA_ROMEO',
  'Mini': 'MINI',
  'Smart': 'SMART',
  'RAM': 'RAM',
  'Dodge': 'DODGE',
  'Chrysler': 'CHRYSLER',
  'Cadillac': 'CADILLAC',
  'Lincoln': 'LINCOLN',
  'Infiniti': 'INFINITI',
  'Acura': 'ACURA',
  'Lexus': 'LEXUS',
  'Tesla': 'TESLA',
  'BYD': 'BYD',
  'Chery': 'CHERY',
  'JAC': 'JAC',
  'Lifan': 'LIFAN',
  'TAC': 'TAC',
  'Great Wall': 'GREAT_WALL',
  'CAOA Chery': 'CAOA_CHERY',
  'Iveco': 'IVECO',
  'Scania': 'SCANIA',
  'MAN': 'MAN',
  'Mercedes-Benz Trucks': 'MERCEDES_BENZ_TRUCKS',
}

/**
 * Converte o displayName da marca (retornado pelo backend) para o formato do enum CarBrand
 * Ex: "Volkswagen" -> "VOLKSWAGEN", "Mercedes-Benz" -> "MERCEDES_BENZ"
 */
export function getCarBrandEnum(brandName: string): string | null {
  if (!brandName) return null
  
  // Tenta encontrar no mapeamento direto (case-insensitive)
  const normalized = brandName.trim()
  
  // Busca exata
  if (DISPLAY_NAME_TO_ENUM[normalized]) {
    return DISPLAY_NAME_TO_ENUM[normalized]
  }
  
  // Busca case-insensitive
  for (const [displayName, enumValue] of Object.entries(DISPLAY_NAME_TO_ENUM)) {
    if (displayName.toLowerCase() === normalized.toLowerCase()) {
      return enumValue
    }
  }
  
  // Se não encontrou, tenta normalizar manualmente
  const normalizedEnum = normalized
    .toUpperCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_')
    .replace(/Ó/g, 'O')
    .replace(/Õ/g, 'O')
    .replace(/Ã/g, 'A')
    .replace(/Á/g, 'A')
    .replace(/É/g, 'E')
    .replace(/Ê/g, 'E')
    .replace(/Í/g, 'I')
    .replace(/Ú/g, 'U')
    .replace(/Ç/g, 'C')
    .replace(/Ë/g, 'E')
    .replace(/Ö/g, 'O')
    .replace(/Ü/g, 'U')
  
  // Verifica se o valor normalizado existe no mapeamento
  const found = Object.values(DISPLAY_NAME_TO_ENUM).find(v => v === normalizedEnum)
  return found || null
}

