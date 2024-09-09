import { GOOGLE_EVENT_COLORS } from 'src/@core/configs/googleEventColors'

export const getRadiantBackground = (colorId: any) => {
  const color = GOOGLE_EVENT_COLORS[colorId]?.color || '#ffffff' // Fallback to white if colorId doesn't exist
  return {
    background: `repeating-linear-gradient(
        45deg,
        ${color}33,  /* rgba with 0.1 opacity */
        ${color}33 10px,
        ${color}88 10px,  /* rgba with 0.3 opacity */
        ${color}88 20px
      )`
  }
}
