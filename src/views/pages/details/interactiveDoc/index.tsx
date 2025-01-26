import React, { useState, useRef, useEffect } from 'react'
import { Link, Bold, Italic, Underline } from 'lucide-react'

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

const InteractiveDoc: React.FC = () => {
  const [hoverToolbar, setHoverToolbar] = useState<MenuState>({
    show: false,
    position: null
  })

  const selectionStartPosition = useRef<Position | null>(null)

  const handleSelectionChange = () => {
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) {
      if (!hoverToolbar.show) {
        const range = selection.getRangeAt(0)

        const startContainer = range.startContainer
        let rect

        if (startContainer.nodeType === Node.TEXT_NODE) {
          const tempRange = range.cloneRange()
          tempRange.setEnd(tempRange.startContainer, tempRange.startOffset + 1) 
          rect = tempRange.getBoundingClientRect()
          tempRange.detach() 
        } else {
          rect = (startContainer as Element).getBoundingClientRect()
        }

        const x = rect.left + window.scrollX
        const y = rect.top + window.scrollY

        selectionStartPosition.current = { x, y }

        setHoverToolbar({
          show: true,
          position: { x, y }
        })
      }
    } else {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
  }

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [hoverToolbar.show])

  const applyFormat = (format: string) => {
    if (format === 'bold' || format === 'italic' || format === 'underline') {
      document.execCommand(format)
    } else if (format === 'link') {
      const url = prompt('Enter URL:')
      if (url) {
        document.execCommand('createLink', false, url)
      }
    }
    setHoverToolbar({ show: false, position: null })
    selectionStartPosition.current = null
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
      <div className=''>
        <div
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
