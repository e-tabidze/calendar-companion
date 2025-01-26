import { Link, Bold, Italic, Underline } from 'lucide-react'

export interface Position {
  x: number
  y: number
}

const HoverToolbar: React.FC<{
  onSelect: (command: string) => void
  position: Position
}> = ({ onSelect, position }) => {
  const tools = [
    { icon: Bold, value: 'bold' },
    { icon: Italic, value: 'italic' },
    { icon: Underline, value: 'underline' },
    { icon: Link, value: 'link' }
  ]

  return (
    <div
      className='absolute bg-white shadow-lg rounded-full border border-gray-200 p-2 flex gap-1 z-50 w-fit'
      style={{
        top: `${position.y}px`,
        left: `calc(${position.x}px + 70px)`,
        transform: 'translate(-50%, -120%)'
      }}
    >
      {tools.map(tool => (
        <button key={tool.value} className='p-2 hover:bg-gray-100 rounded-full' onClick={() => onSelect(tool.value)}>
          <tool.icon className='w-4 h-4' />
        </button>
      ))}
    </div>
  )
}

export default HoverToolbar
