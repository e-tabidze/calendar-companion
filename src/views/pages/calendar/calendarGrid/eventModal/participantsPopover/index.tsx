import { useEffect, useRef, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { useQuery } from '@tanstack/react-query'
import { IconButton } from 'src/views/components/button'

interface Props {
  getParticipants: any
  event_participants: any
  appendParticipant: any
  removeParticipant: any
  setValue: any
}

const ParticipantsPopover: React.FC<Props> = ({
  getParticipants,
  event_participants,
  appendParticipant,
  removeParticipant,
  setValue
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [eventParticipants, setEventParticipants] = useState<any[]>([])

  console.log(eventParticipants, 'eventParticipants')

  useEffect(() => {
    setValue('event_participants', eventParticipants)
  }, [eventParticipants])

  const popoverRef = useRef(null)

  const useGetParticipants = useQuery({
    queryKey: ['participants', searchTerm],
    queryFn: () => getParticipants(searchTerm),
    enabled: !!searchTerm.trim(),
    staleTime: Infinity
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const participantsData = useGetParticipants.data?.result?.data

  const isParticipantAdded = (userId: string) => {
    return eventParticipants.some((participant: any) => participant.user_id === userId)
  }

  const handleParticipantClick = (participant: any) => {
    if (isParticipantAdded(participant.user_id)) {
      setEventParticipants(prev => prev.filter(p => p.user_id !== participant.user_id))
    } else {
      setEventParticipants(prev => [...prev, participant])
    }
  }

  return (
    <div className='w-full'>
      <Popover ref={popoverRef}>
        <PopoverButton className='mt-px text-[13px] w-full justify-between flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
          <div className='flex'>
            {eventParticipants.length > 0 ? (
              <div className='flex items-center'>
                {eventParticipants.slice(0, 5).map((participant: any, index: number) => (
                  <div
                    key={index}
                    className={`h-7 w-7 rounded-full text-white border-2 border-[#fff] -ml-[10px]`}
                    style={{ backgroundColor: participant.color }}
                  >
                    {participant?.username?.charAt(0)}
                  </div>
                ))}

                {eventParticipants.length > 5 && (
                  <div className='ml-2'>
                    <Typography type='subtitle' color='light'>
                      +{eventParticipants.length - 5} participants
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
          <div className='flex items-center pl-3 pt-3 pb-1 pr-[50px]'>
            <Icon svgPath='search' width={18} height={18} className='fill-transparent' />
            <input
              placeholder='Search partipicant'
              className='ml-2 w-full'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className='h-px w-full bg-raisin-10 mt-3' />

          <div className='pl-3 pb-3 pt-1 pr-[50px]'>
            {participantsData?.map((data: any, index: number) => (
              <div
                key={index}
                className={`flex rounded-sm p-2 items-center justify-between w-[434px] mb-1 ${
                  isParticipantAdded(data.user_id) ? 'bg-primary-15' : 'bg-grey-70'
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
                  <Icon svgPath='participantSettings' height={15} width={15} />
                  <Icon svgPath='deleteParticipant' height={15} width={15} />
                  <div className='w-px h-10 bg-grey-10' />
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
