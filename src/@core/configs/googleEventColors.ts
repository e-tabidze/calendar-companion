type GoogleEventColor = {
  id: string
  name: string
  color: string
  solid: string
  rgb: string
}

export const GOOGLE_EVENT_COLORS: Record<number, GoogleEventColor> = {
  0: { id: '0', name: 'Default', color: '#039be5', solid: '#9AD7F5', rgb: 'rgb(3, 155, 229)' },
  1: { id: '1', name: 'Lavender', color: '#7986cb', solid: '#C9CFEA', rgb: 'rgb(121, 134, 203)' },
  2: { id: '2', name: 'Sage', color: '#33b679', solid: '#ADE2C9', rgb: 'rgb(51, 182, 121)' },
  3: { id: '3', name: 'Grape', color: '#8e24aa', solid: '#D2A7DD', rgb: 'rgb(142, 36, 170)' },
  4: { id: '4', name: 'Flamingo', color: '#e67c73', solid: '#F5CBC7', rgb: 'rgb(230, 124, 115)' },
  5: { id: '5', name: 'Banana', color: '#f6bf26', solid: '#FBE5A8', rgb: 'rgb(246, 191, 38)' },
  6: { id: '6', name: 'Tangerine', color: '#f4511e', solid: '#FBB9A5', rgb: 'rgb(244, 81, 30)' },
  7: { id: '7', name: 'Peacock', color: '#039be5', solid: '#9AD7F5', rgb: 'rgb(3, 155, 229)' },
  8: { id: '8', name: 'Graphite', color: '#616161', solid: '#C0C0C0', rgb: 'rgb(97, 97, 97)' },
  9: { id: '9', name: 'Blueberry', color: '#3f51b5', solid: '#B2B9E1', rgb: 'rgb(63, 81, 181)' },
  10: { id: '10', name: 'Basil', color: '#0b8043', solid: '#9DCCB4', rgb: 'rgb(11, 128, 67)' },
  11: { id: '11', name: 'Tomato', color: '#d50000', solid: '#EE9999', rgb: 'rgb(213, 0, 0)' }
}
