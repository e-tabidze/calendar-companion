import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import useWorkspace from './useWorkspace'
import { useMutation } from '@tanstack/react-query'
import useUserData from 'src/hooks/useUserData'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SelectWorkspace = () => {
  const { workspaces, activeWorkspace } = useUserData()

  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null)

  const router = useRouter()

  const { postSwitchWorkspace } = useWorkspace()

  const postSwitchWorkspaceMutation = useMutation(
    (active_profile_id: string) => postSwitchWorkspace('', active_profile_id),
    {
      onSuccess: () => {
        router.reload()
      },
      onError: (response: any) => {
        console.log(response, 'response error')
      },
    }
  )

  useEffect(() => {
    if (activeWorkspace) {
      setSelectedWorkspace(activeWorkspace.id)
    }
  }, [activeWorkspace])

  const handleWorkspaceSelect = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId)
    postSwitchWorkspaceMutation.mutate(workspaceId)
  }

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
              {workspaces?.map((workspace: any) => (
                <div
                  key={workspace.id}
                  className='flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer'
                  onClick={() => handleWorkspaceSelect(workspace.id)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedWorkspace === workspace.id ? 'border-orange-500' : 'border-gray-300'
                    } flex items-center justify-center`}
                  >
                    {selectedWorkspace === workspace.id && <div className='w-2 h-2 rounded-full bg-orange-500'></div>}
                  </div>
                  <span className={`text-sm ${selectedWorkspace === workspace.id ? 'text-black' : 'text-gray-600'}`}>
                    {workspace.title}
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
