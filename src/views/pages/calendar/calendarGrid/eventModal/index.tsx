import { Dialog, DialogPanel } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { EventInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import DateDropdown from 'src/views/components/dateDropdown'
import useCreateEvent from './useCreateEvent'
import TimeSelectorPopover from './timeSelectorPopover'
import RepeatEventPopover from './repeatEventPopover'
import SwitchField from 'src/views/components/switchField'
import { DefaultButton, IconButton, IconTextButton } from 'src/views/components/button'
import EventColorPopover from './eventColorPopover'
import SelectCalendarPopover from './selectCalendarPopover'
import GoingPopover from './goingPopover'
import { formatTimeDifference } from 'src/utils/timeFormatter'
import ParticipantsPopover from './participantsPopover'
import useUserData from 'src/hooks/useUserData'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

function convertTo24Hour(timeString: string) {
  const [time, modifier] = timeString.split(' ')
  let [hours] = time.split(':').map(Number)

  if (modifier === 'PM' && hours !== 12) {
    hours += 12 
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0 
  }

  return hours
}

interface Props {
  isOpen: boolean
  toggleIsOpen: () => void
  selectedDate: Date | null
  selectedStartHour: null | number
  clickedEvent: null | any
  setClickedEvent: any
}

const EventModal: React.FC<Props> = ({
  isOpen,
  toggleIsOpen,
  selectedDate,
  selectedStartHour,
  clickedEvent,
  setClickedEvent
}) => {
  const { primaryCalendar } = useUserData()

  const [isEditable, setIsEditable] = useState<boolean>(false)

  const router = useRouter()

  const queryClient = useQueryClient()

  const {
    handleSubmit,
    control,
    createEventValues,
    setValue,
    getParticipants,
    postCreateGoogleEvent,
    reset,
    putUpdateGoogleEvent
  } = useCreateEvent(selectedDate, selectedStartHour, clickedEvent)

  const timeDifferenceString = selectedDate
    ? formatTimeDifference(selectedDate, selectedStartHour)
    : clickedEvent !== null
    ? formatTimeDifference(new Date(clickedEvent?.start?.dateTime), convertTo24Hour(clickedEvent?.startTime))
    : ''

  const postCreateEventMutation = useMutation(
    () => postCreateGoogleEvent('', primaryCalendar?.account_id, createEventValues),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userInfo'])
      },
      onError: () => {
        console.log('TODO: Error creating event')
      },
      onSettled: () => {
        reset()
      }
    }
  )

  const putUpdateEventMutation = useMutation(
    () => putUpdateGoogleEvent('', clickedEvent.id, primaryCalendar?.account_id, createEventValues),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userInfo'])
      },
      onError: () => {
        console.log('TODO: Error updating event')
      },
      onSettled: () => {
        reset()
      }
    }
  )

  console.log(clickedEvent, 'clickedEvent')
  console.log(createEventValues, 'createEventValues')

  const handleCloseAndSubmit = () => {
    if (createEventValues.title) {
      if (clickedEvent !== null) {
        putUpdateEventMutation.mutate()
      } else {
        postCreateEventMutation.mutate()
      }
    }
    toggleIsOpen()
  }

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSingleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    clickTimeoutRef.current = setTimeout(() => {
      if (clickedEvent && !isEditable) {
        router.push(`/details/${clickedEvent.id}`)
      }
    }, 300)
  }

  const handleDoubleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    if (clickedEvent) {
      setIsEditable(true)
    }
  }

  const handleBlur = () => {
    setIsEditable(false)
  }

  return (
    <Transition
      show={isOpen}
      enter='transition-transform transition-opacity duration-600'
      enterFrom='transform translate-y-10 opacity-0'
      enterTo='transform translate-y-0 opacity-100'
      leave='transition-transform transition-opacity duration-600'
      leaveFrom='transform translate-y-0 opacity-100'
      leaveTo='transform translate-y-10 opacity-0'
    >
      <form onSubmit={handleSubmit(handleCloseAndSubmit)}>
        <Dialog
          open={isOpen}
          onClose={handleCloseAndSubmit}
          className='fixed mx-auto inset-x-0 bottom-6 z-50 flex items-center justify-center transition duration-800 ease-out w-full h-full'
          transition
          onClick={handleCloseAndSubmit}
        >
          <DialogPanel className='max-w-lg w-full rounded-lg bg-white shadow-lg absolute bottom-0'>
            <div className='px-[18px] pt-[18px]'>
              <div className='flex gap-3'>
                <div className='h-[51px] w-1 bg-red-100' />
                <div className='w-full'>
                  <Typography type='subtitle' color='light'>
                    {timeDifferenceString}
                  </Typography>
                  <div onClick={handleSingleClick} onDoubleClick={handleDoubleClick} className={`relative`}>
                    <EventInput
                      control={control}
                      name='title'
                      readOnly={!isEditable}
                      className={`h-[30px] bg-white mt-1 w-full text-lg font-bold ${
                        isEditable ? 'cursor-text' : 'cursor-pointer'
                      }`}
                      placeholder='Add title'
                      boldPlaceholder
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='h-[51px] w-1 bg-white' />
                <EventInput
                  control={control}
                  name='description'
                  className='h-[30px] bg-white'
                  placeholder='Add description'
                />
              </div>
            </div>

            <div className='w-full h-px bg-grey-10' />

            <div className='bg-grey-70 rounded-xl flex m-[18px] p-3'>
              <div className='w-11 h-11 rounded-full bg-white flex justify-center items-center'>
                <Icon svgPath='googleMeet' width={25} height={25} />
              </div>
              <div className='w-full ml-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <DateDropdown name='selected_date' control={control} label='date' errors={undefined} />
                    <TimeSelectorPopover control={control} />
                    <div className='w-1 h-1 rounded-full bg-raisin-80' />
                    <RepeatEventPopover control={control} />
                  </div>
                  <SwitchField name='all_day' label='All day' control={control} reversed height='h-[14px]' />
                </div>
                <DefaultButton
                  text='Add meeting link'
                  className={`border-none text-2sm !px-0 ${createEventValues.meeting_link ? '!text-primary-100' : ''} `}
                  type='button'
                  onClick={() => setValue('meeting_link', !createEventValues.meeting_link)}
                />
              </div>
            </div>

            <div className='mx-[18px] flex gap-[18px] mb-[18px]'>
              <div className='border border-grey-70 rounded-xl p-3 flex-grow'>
                <Typography type='subtitle' color='light'>
                  Participants
                </Typography>
                <ParticipantsPopover
                  getParticipants={getParticipants}
                  setValue={setValue}
                  clickedEvent={clickedEvent}
                />
              </div>

              <div className='border border-grey-70 rounded-xl p-3 min-w-[180px]'>
                <Typography type='subtitle' color='light' className='mb-3'>
                  Companion bot
                </Typography>
                <SwitchField name='companion_bot' label='Attend' control={control} reversed height='h-[17px]' />
              </div>
            </div>

            {/* <div className='mx-[18px] border border-grey-70 rounded-xl p-3 mb-[18px]'>
              <Typography type='subtitle' color='light' className='mb-3 text-[13px]'>
                Documents
              </Typography>
              <Typography type='subtitle' color='light' className='mb-3'>
                No documents added yet
              </Typography>
            </div> */}

            <div className='w-full h-px bg-grey-10' />

            <div className='m-[18px] flex gap-4 items-center justify-between'>
              <div className='flex gap-4 items-center'>
                <SelectCalendarPopover control={control} />
                <EventColorPopover control={control} />

                <IconButton
                  icon={createEventValues.is_private ? 'padlock' : 'padlockOpen'}
                  width={22}
                  height={22}
                  type='button'
                  onClick={() => setValue('is_private', !createEventValues.is_private)}
                />
                <IconTextButton
                  icon={createEventValues.busy ? 'busy' : 'free'}
                  width={16}
                  height={16}
                  onClick={() => setValue('busy', !createEventValues.busy)}
                  type='button'
                  label={createEventValues.busy ? 'Busy' : 'Free'}
                  className='w-[52px]'
                />
              </div>
              <GoingPopover control={control} />
            </div>
          </DialogPanel>
        </Dialog>
      </form>
    </Transition>
  )
}

export default EventModal
