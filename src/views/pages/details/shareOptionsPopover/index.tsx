import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Icon from 'src/views/app/Icon'

const ShareOptionsPopover = () => {
  const handleFbShare = (e: any) => {
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  const handleTwitterShare = (e: any) => {
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  const handleLinkedInShare = (e: any) => {
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  const handleCopyLink = (e: any) => {
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      const url = window.location.href
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log('URL copied to clipboard:', url)
        })
        .catch(error => {
          console.error('Error copying URL to clipboard:', error)
        })
    }
  }

  const icons = [
    {
      id: 1,
      icon: 'fb',
      onClick: handleFbShare
    },
    {
      id: 2,
      icon: 'twitter',
      onClick: handleTwitterShare
    },
    {
      id: 3,
      icon: 'linkedin',
      onClick: handleLinkedInShare
    },
    {
      id: 4,
      icon: 'copylink',
      onClick: handleCopyLink
    }
  ]

  return (
    <Popover className='relative'>
      <Popover.Button className="hover:bg-raisin-10 rounded-full w-10 h-10 flex items-center justify-center">
        <Icon svgPath='share' width={24} height={24} className='cursor-pointer' />
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
        <Popover.Panel className='absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform overflow-hidden rounded-2xl shadow-lg bg-white px-5 py-3'>
          <ul className='flex gap-2'>
            {icons.map(icon => (
              <li key={icon.id} className="hover:bg-raisin-10 rounded-full">
                <Icon svgPath={icon.icon} width={40} height={40} onClick={icon.onClick} className='cursor-pointer' />
              </li>
            ))}
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default ShareOptionsPopover
