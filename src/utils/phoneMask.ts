/**
 * Aplica máscara de telefone no formato (XX) XXXXXXX
 * Suporta telefone fixo (10 dígitos) e celular (11 dígitos)
 * @param value - Valor do input
 * @returns Valor formatado
 */
export function applyPhoneMask(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '')
  
  // Limita a 11 dígitos (DDD + 8 ou 9 dígitos)
  const limitedNumbers = numbers.slice(0, 11)
  
  // Aplica a máscara
  if (limitedNumbers.length === 0) {
    return ''
  } else if (limitedNumbers.length <= 2) {
    // Apenas DDD
    return `(${limitedNumbers}`
  } else {
    // (XX) XXXXXXX ou (XX) XXXXXXXX
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
  }
}

/**
 * Remove formatação do telefone, deixando apenas números
 * @param value - Valor formatado
 * @returns Apenas números
 */
export function removePhoneMask(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Valida se o telefone tem o tamanho correto (10 ou 11 dígitos)
 * @param value - Valor do telefone (com ou sem máscara)
 * @returns true se válido
 */
export function isValidPhone(value: string): boolean {
  const numbers = removePhoneMask(value)
  return numbers.length === 10 || numbers.length === 11
}

