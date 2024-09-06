import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useState } from 'react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'

const SelectWorkspace = () => {
  const workspaces = [
    { id: 1, name: 'Companion AI' },
    { id: 2, name: 'Pixcell Studio' }
  ]

  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0].id)

  return (
    <div className='flex gap-8 relative'>
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton
              className={`flex flex-col items-center text-xs group ${open ? 'text-raisin-110' : 'text-gray-600'}`}
            >
              <Icon
                svgPath='dockWorkspace'
                width={24}
                height={24}
                color={open ? '#2E2E2E' : '#A2A2A2'}
                className='transition-all'
              />
              <span className={`${open ? 'text-raisin-110' : 'text-gray-600'}`}>Workspaces</span>
            </PopoverButton>
            <PopoverPanel
              transition
              anchor='bottom'
              className='min-w-[250px] divide-y -mt-5 z-40 absolute shadow-md divide-white/5 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
            >
              <div className='flex gap-2 items-center p-3'>
                <Icon svgPath='suitcase' width={16} height={16} />
                <Typography type='subtitle' color='light'>
                  Select workspace
                </Typography>
              </div>
              <div className='w-full h-px bg-grey-10' />
              {workspaces.map(workspace => (
                <div
                  key={workspace.id}
                  className='flex items-center gap-3 p-2 hover:bg-grey-20 rounded cursor-pointer px-3 py-2'
                  onClick={() => setSelectedWorkspace(workspace.id)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-1 ${
                      selectedWorkspace === workspace.id ? 'border-primary-100' : 'border-grey-10'
                    } flex items-center justify-center`}
                  >
                    {selectedWorkspace === workspace.id && <div className='w-3 h-3 rounded-full bg-primary-100'></div>}
                  </div>
                  <span className={`text-sm ${selectedWorkspace === workspace.id ? 'text-black' : 'text-grey-80'}`}>
                    {workspace.name}
                  </span>
                </div>
              ))}
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SelectWorkspace
