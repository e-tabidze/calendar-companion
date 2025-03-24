import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { SmilePlus } from 'lucide-react'

const EMOJI_CATEGORIES = [
  {
    name: 'Smileys',
    emojis: [
      { emoji: '😊', label: 'Smile' },
      { emoji: '😂', label: 'Joy' },
      { emoji: '🥰', label: 'Love' },
      { emoji: '😎', label: 'Cool' },
      { emoji: '🤔', label: 'Thinking' },
      { emoji: '😴', label: 'Sleep' }
    ]
  },
  {
    name: 'Gestures',
    emojis: [
      { emoji: '👍', label: 'Thumbs Up' },
      { emoji: '👋', label: 'Wave' },
      { emoji: '🙌', label: 'Raised Hands' },
      { emoji: '👏', label: 'Clap' },
      { emoji: '🤝', label: 'Handshake' },
      { emoji: '✌️', label: 'Peace' }
    ]
  },
  {
    name: 'Symbols',
    emojis: [
      { emoji: '❤️', label: 'Heart' },
      { emoji: '⭐', label: 'Star' },
      { emoji: '✨', label: 'Sparkles' },
      { emoji: '🎉', label: 'Party' },
      { emoji: '🔥', label: 'Fire' },
      { emoji: '💡', label: 'Idea' }
    ]
  }
]

interface Props {
  label?: boolean
}

const EmojiPicker: React.FC<Props> = ({ label = false }) => {
  return (
    <Popover className='relative'>
      <>
        <Popover.Button className='p-1.5 hover:bg-gray-100 rounded flex items-center gap-2'>
          <SmilePlus size={16} /> {label && 'Reaction'}
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute z-50 mt-1 w-64 -translate-x-1/2 transform'>
            <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='relative bg-white p-2'>
                <div className='flex flex-col gap-2'>
                  {EMOJI_CATEGORIES.map(category => (
                    <div key={category.name} className='space-y-1'>
                      <div className='text-xs font-medium text-gray-500 px-1'>{category.name}</div>
                      <div className='grid grid-cols-6 gap-0.5'>
                        {category.emojis.map(item => (
                          <button
                            key={item.emoji}
                            onClick={() => {
                              document.execCommand('insertText', false, item.emoji)
                              close()
                            }}
                            className='p-1 text-center hover:bg-gray-100 rounded text-lg transition-colors'
                            title={item.label}
                          >
                            {item.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  )
}

export default EmojiPicker
