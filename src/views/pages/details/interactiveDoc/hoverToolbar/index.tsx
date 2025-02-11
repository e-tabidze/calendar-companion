import {
  Bold,
  Italic,
  Underline,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Link2,
  Image,
  Plus,
  MoreHorizontal,
  Strikethrough,
  Superscript,
  Subscript,
  Heading1,
  Languages
} from 'lucide-react'
import { useState } from 'react'
import EmojiPicker from '../emojiPicker'
import { Position } from '../types'

const HoverToolbar: React.FC<{
  onSelect: (command: any) => void
  position: Position
}> = ({ onSelect, position }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div
      className='absolute bg-white shadow-xl rounded-sm border border-gray-200 p-2 flex gap-1 z-50 w-fit flex-col'
      style={{
        top: `${position.y}px`,
        left: `calc(${position.x}px + 170px)`,
        transform: 'translate(-50%, -120%)'
      }}
    >
      <div className='flex items-center space-x-1 p-1'>
        <button onClick={() => onSelect('bold')} className='p-1.5 hover:bg-gray-100 rounded' title='Bold'>
          <Bold size={16} />
        </button>
        <button onClick={() => onSelect('underline')} className='p-1.5 hover:bg-gray-100 rounded' title='Underline'>
          <Underline size={16} />
        </button>
        <button onClick={() => onSelect('italic')} className='p-1.5 hover:bg-gray-100 rounded' title='Italic'>
          <Italic size={16} />
        </button>
        <button onClick={() => onSelect('font')} className='p-1.5 hover:bg-gray-100 rounded' title='Font'>
          <Type size={16} />
        </button>

        <div className='w-px h-5 bg-gray-200 mx-1' />

        <button onClick={() => onSelect('justifyLeft')} className='p-1.5 hover:bg-gray-100 rounded' title='Align Left'>
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => onSelect('justifyCenter')}
          className='p-1.5 hover:bg-gray-100 rounded'
          title='Align Center'
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => onSelect('justifyRight')}
          className='p-1.5 hover:bg-gray-100 rounded'
          title='Align Right'
        >
          <AlignRight size={16} />
        </button>

        <button
          onClick={() => onSelect('insertUnorderedList')}
          className='p-1.5 hover:bg-gray-100 rounded'
          title='Bullet List'
        >
          <List size={16} />
        </button>

        <div className='w-px h-5 bg-gray-200 mx-1' />

        <button onClick={() => onSelect('createLink')} className='p-1.5 hover:bg-gray-100 rounded' title='Insert Link'>
          <Link2 size={16} />
        </button>
        <button
          onClick={() => onSelect('insertImage')}
          className='p-1.5 hover:bg-gray-100 rounded'
          title='Insert Image'
        >
          <Image size={16} />
        </button>

        <EmojiPicker />
        <button
          onClick={() => onSelect('insertBlock')}
          className='p-1.5 hover:bg-gray-100 rounded'
          title='Insert Block'
        >
          <Plus size={16} />
        </button>

        <div className='w-px h-5 bg-gray-200 mx-1' />

        <button
          onClick={() => onSelect('askAI')}
          className='px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded text-sm font-medium hover:text-white transition-all duration-300'
        >
          Ask to AI
        </button>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className='p-1.5 hover:bg-gray-100 rounded ml-1'
          title='More Options'
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {showAdvanced && (
        <div className='flex items-center space-x-1 p-1 border-t border-gray-200'>
          <button
            onClick={() => onSelect('strikethrough')}
            className='p-1.5 hover:bg-gray-100 rounded'
            title='Strikethrough'
          >
            <Strikethrough size={16} />
          </button>
          <button
            onClick={() => onSelect('superscript')}
            className='p-1.5 hover:bg-gray-100 rounded'
            title='Superscript'
          >
            <Superscript size={16} />
          </button>
          <button onClick={() => onSelect('subscript')} className='p-1.5 hover:bg-gray-100 rounded' title='Subscript'>
            <Subscript size={16} />
          </button>
          <button onClick={() => onSelect('heading')} className='p-1.5 hover:bg-gray-100 rounded' title='Heading'>
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => onSelect('codeLanguage')}
            className='p-1.5 hover:bg-gray-100 rounded'
            title='Code Language'
          >
            <Languages size={16} />
          </button>
        </div>
      )}

      <div className='absolute left-1/2 bottom-0 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 translate-y-1.5 -translate-x-1.5' />
    </div>
  )
}

export default HoverToolbar
