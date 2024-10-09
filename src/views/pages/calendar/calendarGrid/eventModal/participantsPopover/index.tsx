import { useRef, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { useQuery } from '@tanstack/react-query'

interface Props {
  getParticipants: any
}

const ParticipantsPopover: React.FC<Props> = ({  getParticipants }) => {
  const [searchTerm, setSearchTerm] = useState('')

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

  return (
    <div className='w-full'>
      <Popover ref={popoverRef}>
        {({ close }) => (
          <>
            <PopoverButton className='mt-px text-[13px] w-full justify-between flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
              <Typography type='subtitle' color='light'>
                No participants yet
              </Typography>
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
                {participantsData?.map((data: any) => (
                  <div
                    key={data?.user_id}
                    className='flex bg-grey-70 rounded-sm p-2 items-center justify-between w-[434px] mb-1'
                  >
                    <div className='flex items-center gap-2'>
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
                      <div className="w-px h-10 bg-grey-10" />
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  )
}

export default ParticipantsPopover
