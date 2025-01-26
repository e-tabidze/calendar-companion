import React, { useState, useRef, useEffect } from 'react'
import { Link, Type, Bold, Italic, Underline, List, TextQuote, MessageSquare } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface MenuState {
  show: boolean
  position: Position | null
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
      className='fixed bg-white shadow-lg rounded-full border border-gray-200 p-2 flex gap-1 z-50 w-fit'
      style={{
        bottom: `calc(100vh - ${position.y}px + 10px)`,
        left: `${position.x}px`,
        transform: 'translateX(-50%)'
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

const InteractiveDoc: React.FC = () => {
  const [hoverToolbar, setHoverToolbar] = useState<MenuState>({ show: false, position: null })
  const editorRef = useRef<HTMLDivElement>(null)

  const handleSelectionChange = () => {
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      
      setHoverToolbar({
        show: true,
        position: {
          x: rect.left,
          y: rect.top
        }
      })
    } else {
      setHoverToolbar({ show: false, position: null })
    }
  }

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [])

  const applyFormat = (format: string) => {
    if (format === 'h1' || format === 'h2' || format === 'h3') {
      document.execCommand('formatBlock', false, format)
    } else if (format === 'bullet') {
      document.execCommand('insertUnorderedList')
    } else if (format === 'quote') {
      document.execCommand('formatBlock', false, 'blockquote')
    } else if (format === 'bold' || format === 'italic' || format === 'underline') {
      document.execCommand(format)
    }
    setHoverToolbar({ show: false, position: null })
  }

  return (
    <div className='w-full'>
      <div
        className='text-4xl font-bold text-gray-500 focus:outline-none'
        contentEditable
        suppressContentEditableWarning
      >
        Add page title
      </div>
      <div className='text-lg text-gray-400 focus:outline-none mt-3' contentEditable suppressContentEditableWarning>
        👉 Add a subtitle to let others know how this template should be used
      </div>
      <div className='relative'>
        <div
          ref={editorRef}
          className='min-h-[200px] p-4 rounded-lg focus:outline-none'
          contentEditable
          suppressContentEditableWarning
        />
        {hoverToolbar.show && hoverToolbar.position && (
          <HoverToolbar onSelect={applyFormat} position={hoverToolbar.position} />
        )}
      </div>
    </div>
  )
}

export default InteractiveDoc