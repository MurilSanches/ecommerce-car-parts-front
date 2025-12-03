import { useState, useEffect, useRef } from 'react'
import { applyCepMask, removeCepMask } from '../utils/cepMask'

interface CepInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onUnmaskedChange?: (unmaskedValue: string) => void
}

/**
 * Componente de input de CEP com máscara XXXXX-XXX
 * O valor formatado é exibido no input, mas o onChange retorna o valor sem formatação
 * Para formulários não controlados, use defaultValue e o valor será salvo no FormData com formatação
 * que deve ser removida antes de enviar ao backend usando removeCepMask()
 */
export function CepInput({ 
  value: controlledValue, 
  defaultValue,
  onChange,
  onUnmaskedChange,
  ...props 
}: CepInputProps) {
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
      // Se já tem formatação (contém hífen), mantém; se não, aplica
      const isFormatted = /\d{5}-\d{3}/.test(initialValue)
      const formatted = isFormatted 
        ? initialValue 
        : applyCepMask(initialValue)
      setDisplayValue(formatted)
    } else {
      setDisplayValue('')
    }
  }, [defaultValue, isControlled]) // Reage a mudanças no defaultValue

  // Sincronizar com valor controlado
  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      const isFormatted = /\d{5}-\d{3}/.test(controlledValue)
      const formatted = isFormatted 
        ? controlledValue 
        : applyCepMask(controlledValue)
      setDisplayValue(formatted)
    }
  }, [controlledValue, isControlled])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value
    const formatted = applyCepMask(inputValue)
    
    setDisplayValue(formatted)
    
    // Atualiza o valor do input para que o FormData pegue o valor formatado
    // (será removido antes de enviar ao backend)
    if (inputRef.current) {
      inputRef.current.value = formatted
    }
    
    // Retorna valor sem formatação para callbacks
    const unmasked = removeCepMask(formatted)
    
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
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={props.placeholder || '12345-678'}
      maxLength={9} // XXXXX-XXX = 9 caracteres
    />
  )
}

