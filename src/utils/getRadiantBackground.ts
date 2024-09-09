import { GOOGLE_EVENT_COLORS } from 'src/@core/configs/googleEventColors'

export const getRadiantBackground = (colorId: any) => {
  const color = GOOGLE_EVENT_COLORS[colorId]?.color || '#ffffff' 
  
  return {
    background: `repeating-linear-gradient(
        45deg,
        ${color}20, 
        ${color}20 10px,
        ${color}40 10px,  
        ${color}40 20px
      )`
  }
}
