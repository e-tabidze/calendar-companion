import { Fragment, useRef } from 'react'

// CustomHooks
import useWindowDimensions from 'src/hooks/useWindowDimensions'

// Components
import CategoryCard from '../categoryCard'
import Checkbox from '../checkboxField'
import Divider from '../divider'
import Image from '../image'
import { DefaultInput } from '../input'
import Tag from '../tag'
import Typography from '../typography'

// Libraries
import { Dialog, Transition } from '@headlessui/react'

// Styles
import { ListWrapper, SectionWrapper } from './styles'
import SwitchField from '../switchField'
import { useForm } from 'react-hook-form'

interface Props {
  open: boolean
  setOpen: () => void
}

const categories = [
  {
    id: 1,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 2,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 3,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 4,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 5,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 6,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 7,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 8,
    type: 'ეკონომიური',
    available: 231
  }
]

const fuelType = ['ელექტრო', 'ჰიბრიდი', 'დატენვადი ჰიბრიდი', 'ბენზინი', 'დიზელი', 'გაზი']

const doors = ['2/3', '4/5', '5+']

const tires = ['წინა', 'უკანა', '4x4']

const seats = ['ნებისმიერი', '1', '2', '3', '4', '5', '6', '7', '8+']

const additionalParameters = [
  {
    id: 1,
    label: 'შშმპ პირებზე ოპტიმიზირებული'
  },
  {
    id: 2,
    label: 'Android Auto'
  },
  {
    id: 3,
    label: 'პარკინგის სენსორი'
  },
  {
    id: 4,
    label: 'GPS'
  },
  {
    id: 5,
    label: 'ცხოველების დაშვება'
  },
  {
    id: 6,
    label: 'USB დამტენი'
  },
  {
    id: 7,
    label: '4 წამყვანი თვალი'
  },
  {
    id: 8,
    label: 'Apple CarPlay'
  },
  {
    id: 9,
    label: 'უკანა კამერა'
  },
  {
    id: 10,
    label: 'Bluetooth'
  },
  {
    id: 11,
    label: 'სავარძლის გათბობა'
  },
  {
    id: 12,
    label: 'ზამთრის საბურავები'
  },
  {
    id: 13,
    label: 'USB პორტი'
  }
]

const AdditionalFilters: React.FC<Props> = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null)
  const { width } = useWindowDimensions()
  const { control } = useForm()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 h-screen overflow-y-auto'>
          <div className='absolute left-1/2 -translate-x-1/2 w-11/12 max-w-[790px] flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all w-full md:my-4 md:max-w-3xl'>
                <div className='w-full flex justify-between items-center px-4 py-5 sm:py-6 sm:px-10 border-b-1 border-grey-90'>
                  <Dialog.Title as='h3' className='text-2md text-base-100 leading-6'>
                    დამატებითი ფილტრები
                  </Dialog.Title>
                  <Image src='/icons/close.svg' onClick={setOpen} alt='' height={40} width={40} />
                </div>
                <div className='overflow-auto h-[70vh] px-4 py-5 sm:py-6 sm:px-10 w-max-full'>
                  <Typography type='body' color='dark' className='max-w-[30%]'>
                    ავტომობილები დღიური ფასის მიხედვით
                  </Typography>
                  <div className='w-full flex items-center mb-20 mt-8'>
                    <DefaultInput
                      name=''
                      control={control}
                      label={width > 641 ? 'მინიმუმ ფასი დღიურად' : 'მინ. ფასი დღიურად'}
                      errors={''}
                    />
                    <div className='w-3 h-px bg-base-100 mx-2' />
                    <DefaultInput
                      name=''
                      control={control}
                      label={width > 641 ? 'მინიმუმ ფასი დღიურად' : 'მინ. ფასი დღიურად'}
                      errors={''}
                    />
                  </div>
                  <div className='my-8'>
                    <Typography type='h5' weight='normal'>
                      ავტომობილის კატეგორია
                    </Typography>
                    <Typography type='body' color='light'>
                      შეგიძლია მონიშნო ერთი ან რამდენიმე კატეგორია
                    </Typography>
                    <div className='flex flex-wrap gap-4 my-6'>
                      <CategoryCard border options={categories} name='' control={control} />
                    </div>
                  </div>
                  <div className='my-12'>
                    <Typography type='h5' weight='normal'>
                      ავტომობილის პარამეტრები
                    </Typography>
                    {/* <SelectField
                      name=''
                      control={control}
                      options={selectOptions}
                      placeholder='მწარმოებელი'
                      disabled={false}
                      className='my-2'
                    />
                    <SelectField
                      name=''
                      control={control}
                      options={selectOptions}
                      placeholder='მოდელი'
                      disabled={false}
                      className='my-2'
                    />
                    <SelectField
                      name=''
                      control={control}
                      options={selectOptions}
                      placeholder='წელი'
                      disabled={false}
                      className='my-2'
                    /> */}
                  </div>

                  <Typography type='h5' weight='normal'>
                    საწვავის ტიპი
                  </Typography>
                  <div className='flex flex-wrap gap-3 my-6'>
                    {fuelType.map((type, idx) => (
                      <Tag label={type} key={idx} component={<Image src='icons/electric.svg' alt='' />} height='h-12' />
                    ))}
                  </div>

                  <Typography type='h5' weight='normal'>
                    ადგილების რაოდენობა
                  </Typography>
                  <div className='flex flex-wrap gap-4 my-6'>
                    {seats.map((place, idx) => (
                      <Tag label={place} key={idx} height='h-10' />
                    ))}
                  </div>

                  <Typography type='h5' weight='normal'>
                    ჩემოდნების რაოდენობა
                  </Typography>
                  <div className='flex flex-wrap gap-4 my-6'>
                    {seats.map((place, idx) => (
                      <Tag label={place} key={idx} height='h-10' />
                    ))}
                  </div>
                  <Divider />
                  <SwitchField label='უფასო მიწოდება' name='' control={control} className='my-8' />
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal'>
                      კარის რაოდენობა
                    </Typography>
                    <ListWrapper>
                      {doors.map((type, idx) => (
                        <Tag label={type} key={idx} component={<Image src='icons/doors.svg' alt='' />} height='h-12' />
                      ))}
                    </ListWrapper>
                  </SectionWrapper>
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal'>
                      წამყვანი საბურავები
                    </Typography>
                    <ListWrapper>
                      {tires.map((type, idx) => (
                        <Tag label={type} key={idx} height='h-10' />
                      ))}
                    </ListWrapper>
                  </SectionWrapper>
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal'>
                      ტრანსმისია
                    </Typography>
                    <ListWrapper>
                      {tires.map((type, idx) => (
                        <Tag label={type} key={idx} height={'h-10'} />
                      ))}
                    </ListWrapper>
                  </SectionWrapper>
                  <Divider />

                  <Typography type='h5' weight='normal' className='mt-8'>
                    დამატებითი პარამეტრები
                  </Typography>
                  <Typography type='body' color='light'>
                    შეგიძლია მონიშნო ერთი ან რამდენიმე პარამეტრი
                  </Typography>
                  <div className='py-9 grid grid-cols-2'>
                    {additionalParameters.map(parameter => (
                      <div className='my-2' key={parameter.id}>
                        <Checkbox title={parameter.label} name='' control={control} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='w-full flex items-center justify-between py-[16px] px-10 border-t-1 border-grey-90'>
                  <button className='flex items-center text-raisin-50 text-[12px]'>
                    <Image src='/icons/return.svg' alt='' className='flex mr-2' />
                    გასუფთავება
                  </button>
                  <div className='flex items-center [text-16px]'>
                    სულ 136 შედეგი
                    <button className='ml-[24px] px-[24px] h-[56px] bg-orange text-white text-[16px] flex items-center bg-orange-100 rounded-[12px]'>
                      <Image src='/icons/search.svg' alt='' className='flex mr-2' />
                      ძებნა
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AdditionalFilters
