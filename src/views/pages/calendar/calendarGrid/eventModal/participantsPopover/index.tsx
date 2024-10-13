import { useEffect, useRef, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { useQuery } from '@tanstack/react-query'
import { IconButton } from 'src/views/components/button'
import ParticipantRolePopover from './participantRolePopover'

interface Props {
  getParticipants: any
  setValue: any
}

const ParticipantsPopover: React.FC<Props> = ({ getParticipants, setValue }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEventParticipants, setSelectedEventParticipants] = useState<any[]>([])
  const [participantsDataState, setParticipantsDataState] = useState<any[]>([])
  const [typedParticipants, setTypedParticipants] = useState<any>([])

  const useGetParticipants = useQuery({
    queryKey: ['participants', searchTerm],
    queryFn: () => getParticipants(searchTerm),
    enabled: !!searchTerm.trim(),
    staleTime: Infinity
  })

  useEffect(() => {
    setValue('event_participants', selectedEventParticipants)
  }, [selectedEventParticipants, participantsDataState])

  useEffect(() => {
    const participantsData = useGetParticipants.data?.result?.data || []
    setParticipantsDataState([...participantsData, ...typedParticipants])
  }, [useGetParticipants.data, typedParticipants])

  const popoverRef = useRef(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const isParticipantAdded = (userId: string) => {
    return selectedEventParticipants.some((participant: any) => participant.username === userId)
  }

  const handleParticipantClick = (participant: any) => {
    if (isParticipantAdded(participant.username)) {
      setSelectedEventParticipants(prev => prev.filter(p => p.username !== participant.username))
    } else {
      const newParticipant: any = {
        ...participant,
        role: 'viewer'
      }
      setSelectedEventParticipants(prev => [...prev, newParticipant])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const newParticipant = {
        user_id: '',
        username: searchTerm.trim(),
        full_name: '',
        color: '#32A623',
        role: 'viewer'
      }

      if (!participantsDataState.some((participant: any) => participant.username === newParticipant.username)) {
        setTypedParticipants((prev: any) => [...prev, newParticipant])
        setParticipantsDataState(prev => [...prev, newParticipant])
        setSearchTerm('')
      }
    }
  }

  const handleRoleUpdate = (username: string, newRole: string) => {
    setSelectedEventParticipants(prev =>
      prev.map(participant => (participant.username === username ? { ...participant, role: newRole } : participant))
    )
  }

  const filteredParticipants = participantsDataState.filter(data =>
    data.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='w-full'>
      <Popover ref={popoverRef}>
        <PopoverButton className='mt-px text-[13px] w-full justify-between flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
          <div className='flex'>
            {selectedEventParticipants.length > 0 ? (
              <div className='flex items-center'>
                {selectedEventParticipants.slice(0, 5).map((participant: any, index: number) => (
                  <div
                    key={index}
                    className={`h-7 w-7 rounded-full text-white border-2 border-[#fff] -ml-[10px]`}
                    style={{ backgroundColor: participant.color }}
                  >
                    {participant?.username?.charAt(0)}
                  </div>
                ))}

                {selectedEventParticipants.length > 5 && (
                  <div className='ml-2'>
                    <Typography type='subtitle' color='light'>
                      +{selectedEventParticipants.length - 5} participants
                    </Typography>
                  </div>
                )}
              </div>
            ) : (
              <Typography type='subtitle' color='light'>
                No participants yet
              </Typography>
            )}
          </div>
          <IconButton icon='add' width={24} height={24} />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor='bottom'
          className='divide-y shadow-md divide-white/5 w-[460px] h-fit rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
        >
          <div className='flex items-center pl-3 pt-3 pb-1 pr-4'>
            <Icon svgPath='search' width={18} height={18} className='fill-transparent' />
            <input
              placeholder='Search partipicant'
              className='ml-2 w-full'
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className='h-px w-full bg-raisin-10 mt-3' />

          <div className='pl-3 pb-3 pt-1 pr-4'>
            {filteredParticipants?.map((data: any, index: number) => (
              <div
                key={index}
                className={`flex rounded-sm p-2 items-center justify-between w-[434px] mb-1 ${
                  isParticipantAdded(data.username) ? 'bg-primary-15' : 'bg-grey-70'
                }`}
              >
                <div className='flex items-center gap-2' onClick={() => handleParticipantClick(data)}>
                  <div
                    className={`w-8 h-8 text-white text-lg rounded-full text-center flex items-center justify-center mr-2`}
                    style={{ background: data?.color }}
                  >
                    {data?.username?.charAt(0)}
                  </div>
                  <div>
                    <Typography type='subtitle' color='light' className='text-sm'>
                      {data?.full_name}
                    </Typography>
                    <Typography type='subtitle' className='text-sm'>
                      {data?.username}
                    </Typography>
                  </div>
                </div>
                <div className='flex gap-2 mr-2 items-center'>
                  <div className='w-[36px] flex gap-2 mr-2 items-center'>
                    <Icon svgPath='participantSettings' height={15} width={15} />
                    <Icon svgPath='deleteParticipant' height={15} width={15} />
                  </div>

                  <div className='w-px h-10 bg-grey-10' />

                  <ParticipantRolePopover
                    role={selectedEventParticipants.find(p => p.username === data.username)?.role || 'viewer'}
                    onUpdateRole={newRole => handleRoleUpdate(data.username, newRole)}
                  />
                </div>
              </div>
            ))}
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}

export default ParticipantsPopover
