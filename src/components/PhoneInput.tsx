import { useState, useEffect, useRef } from 'react'
import { applyPhoneMask, removePhoneMask } from '../utils/phoneMask'

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onUnmaskedChange?: (unmaskedValue: string) => void
}

/**
 * Componente de input de telefone com máscara (XX) XXXXXXX
 * O valor formatado é exibido no input, mas o onChange retorna o valor sem formatação
 * Para formulários não controlados, use defaultValue e o valor será salvo no FormData com formatação
 * que deve ser removida antes de enviar ao backend usando removePhoneMask()
 */
export function PhoneInput({ 
  value: controlledValue, 
  defaultValue,
  onChange,
  onUnmaskedChange,
  ...props 
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const isControlled = controlledValue !== undefined

  // Inicializar valor
  useEffect(() => {
    if (isControlled) {
      // Para componentes controlados, o valor é gerenciado pelo useEffect abaixo
      return
    }
    
    const initialValue = defaultValue || ''
    if (initialValue) {
      // Se já tem formatação (contém parênteses e espaço), mantém; se não, aplica
      const isFormatted = /^\(\d{2}\)\s/.test(initialValue)
      const formatted = isFormatted 
        ? initialValue 
        : applyPhoneMask(initialValue)
      setDisplayValue(formatted)
    } else {
      setDisplayValue('')
    }
  }, [defaultValue, isControlled]) // Reage a mudanças no defaultValue

  // Sincronizar com valor controlado
  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      const formatted = controlledValue.includes('(') 
        ? controlledValue 
        : applyPhoneMask(controlledValue)
      setDisplayValue(formatted)
    }
  }, [controlledValue, isControlled])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value
    const formatted = applyPhoneMask(inputValue)
    
    setDisplayValue(formatted)
    
    // Atualiza o valor do input para que o FormData pegue o valor formatado
    // (será removido antes de enviar ao backend)
    if (inputRef.current) {
      inputRef.current.value = formatted
    }
    
    // Retorna valor sem formatação para callbacks
    const unmasked = removePhoneMask(formatted)
    
    if (onChange) {
      onChange(unmasked)
    }
    
    if (onUnmaskedChange) {
      onUnmaskedChange(unmasked)
    }
  }

  // Sempre usa value controlado internamente para manter a máscara
  // O FormData pegará o valor formatado, que deve ser removido antes de enviar
  return (
    <input
      {...props}
      ref={inputRef}
      type="tel"
      value={displayValue}
      onChange={handleChange}
      placeholder={props.placeholder || '(11) 999999999'}
      maxLength={15} // (XX) + espaço + 9 dígitos = 15 caracteres máximo
    />
  )
}

