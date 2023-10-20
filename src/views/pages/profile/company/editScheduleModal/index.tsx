import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Typography from 'src/views/components/typography'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { Divider } from '../../favorites/listComponent/styles'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'
import TimeRangeComponent from '../../createCompany/stepTwo/branchInfoComponent/timeRangeComponent'
import { useForm } from 'react-hook-form'

const days = [
  {
    label: 'ორშ',
    value: 'monday'
  },
  {
    label: 'სამ',
    value: 'tuesday'
  },
  {
    label: 'ოთხ',
    value: 'wednesday'
  },
  {
    label: 'ხუთ',
    value: 'thursday'
  },
  {
    label: 'პარ',
    value: 'friday'
  },
  {
    label: 'შაბ',
    value: 'saturday'
  },
  {
    label: 'კვი',
    value: 'sunday'
  }
]
interface Props {
  open: boolean
  onClose: () => void
}

const EditScheduleModal: React.FC<Props> = ({ open, onClose }) => {
  const [selectedWorkDays, setSelectedWorkDays] = useState<any[]>([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ])

  const { control } = useForm()

  const handleselectedWorkDays = (value: string) => {
    if (selectedWorkDays.includes(value)) {
      setSelectedWorkDays(selectedWorkDays.filter(day => day !== value))
    } else {
      setSelectedWorkDays(prevState => [...prevState, value])
    }
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='w-full flex items-center justify-between px-10 py-6'>
                  <Typography type='h5' weight='normal' className='text-2md'>
                    საათების რედაქტირება
                  </Typography>
                  <IconButton icon='/icons/close.svg' onClick={onClose} width={40} height={40} />
                </Dialog.Title>
                <Divider />
                <div className='mb-20'>
                  <div className='px-9 grid grid-cols-1 gap-7'>
                    <SwitchField label='ერთნაირი დროის მონიშვნა' name='' control={control} defaultValue />
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        {days.map((day, index) => (
                          <RoundedTag
                            key={index}
                            label={day.label}
                            handleSelect={() => handleselectedWorkDays(day.value)}
                            selected={selectedWorkDays.includes(day.value)}
                          />
                        ))}
                      </div>
                      <TimeRangeComponent index={1} control={control} />
                    </div>
                  </div>
                </div>
                <div className='flex justify-end bottom-0 w-full shadow-md'>
                  <DefaultButton
                    text='დამატება'
                    bg='bg-green-100'
                    className='my-4 mr-10'
                    textColor='text-white'
                  ></DefaultButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditScheduleModal
