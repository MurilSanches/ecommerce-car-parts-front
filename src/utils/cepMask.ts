/**
 * Aplica máscara de CEP no formato XXXXX-XXX
 * @param value - Valor do input
 * @returns Valor formatado
 */
export function applyCepMask(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '')
  
  // Limita a 8 dígitos
  const limitedNumbers = numbers.slice(0, 8)
  
  // Aplica a máscara
  if (limitedNumbers.length <= 5) {
    return limitedNumbers
  } else {
    return `${limitedNumbers.slice(0, 5)}-${limitedNumbers.slice(5)}`
  }
}

/**
 * Remove formatação do CEP, deixando apenas números
 * @param value - Valor formatado
 * @returns Apenas números
 */
export function removeCepMask(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Valida se o CEP tem o tamanho correto (8 dígitos)
 * @param value - Valor do CEP (com ou sem máscara)
 * @returns true se válido
 */
export function isValidCep(value: string): boolean {
  const numbers = removeCepMask(value)
  return numbers.length === 8
}

