export const validateQrInput = (value: string) => {
  const trimmed = value.trim()

  if (!trimmed) {
    return { isValid: false, message: 'Adicione um texto ou URL para gerar o QR Code.' }
  }

  if (trimmed.length < 3) {
    return { isValid: false, message: 'Use pelo menos 3 caracteres para um resultado mais útil.' }
  }

  if (trimmed.length > 1800) {
    return { isValid: false, message: 'O conteúdo é muito longo para um QR Code prático.' }
  }

  return { isValid: true, message: 'Pronto para gerar uma experiência elegante.' }
}
