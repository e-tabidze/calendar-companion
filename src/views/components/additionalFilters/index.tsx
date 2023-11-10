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
import useFilters from 'src/hooks/useFilters'
import SelectField from '../selectField'
import CheckboxField from '../checkboxField'

interface Props {
  open: boolean
  setOpen: () => void
  control: any
  appendFuelType: any
  appendSeatType: any
  appendLuggageNumber: any
  appendCategory: any
  appendDriveTire: any
  appendDoorType: any
  appendTransmissionType: any
  appendAdditionalInformation: any
}

const AdditionalFilters: React.FC<Props> = ({
  open,
  setOpen,
  control,
  appendFuelType,
  appendSeatType,
  appendLuggageNumber,
  appendCategory,
  appendDriveTire,
  appendDoorType,
  appendTransmissionType,
  appendAdditionalInformation
}) => {
  const cancelButtonRef = useRef(null)
  const { width } = useWindowDimensions()
  const {
    categoriesFilter,
    fuelTypesFilter,
    seatTypesFilter,
    doorTypesFilter,
    driveTiresFilter,
    transmisisonTypesFilter,
    luggageNumbers,
    additionalInformationFilters
  } = useFilters()

  console.log(additionalInformationFilters, 'additionalInformationFilters')

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-[111]' initialFocus={cancelButtonRef} onClose={setOpen}>
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
                      name='price_min'
                      control={control}
                      label={width > 641 ? 'მინიმუმ ფასი დღიურად' : 'მინ. ფასი დღიურად'}
                      errors={''}
                    />
                    <div className='w-3 h-px bg-base-100 mx-2' />
                    <DefaultInput
                      name='price_max'
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
                    <>
                      {width > 779 ? (
                        <div className='flex flex-wrap gap-4 my-6'>
                          <CategoryCard
                            name='category'
                            control={control}
                            options={categoriesFilter}
                            border
                            append={appendCategory}
                          />
                        </div>
                      ) : (
                        <SelectField
                          control={control}
                          name='category'
                          options={categoriesFilter}
                          placeholder='კატეგორია'
                          valueKey='id'
                          labelKey='title'
                        />
                      )}
                    </>
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
                    <Tag
                      options={fuelTypesFilter}
                      name='fuel_types'
                      control={control}
                      height='h-10'
                      append={appendFuelType}
                    />
                  </div>

                  <Typography type='h5' weight='normal'>
                    ადგილების რაოდენობა
                  </Typography>
                  <div className='flex flex-wrap gap-4 my-6'>
                    <Tag
                      options={seatTypesFilter}
                      name='seat_types'
                      control={control}
                      height='h-10'
                      append={appendSeatType}
                    />
                  </div>

                  <Typography type='h5' weight='normal'>
                    ჩემოდნების რაოდენობა
                  </Typography>
                  <div className='flex flex-wrap gap-4 my-6'>
                    <Tag
                      options={luggageNumbers}
                      height='h-10'
                      name='luggage_numbers'
                      control={control}
                      append={appendLuggageNumber}
                    />
                  </div>
                  <Divider />
                  <SwitchField label='უფასო მიწოდება' name='free_delivery' control={control} className='my-8' />
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal'>
                      კარის რაოდენობა
                    </Typography>
                    <ListWrapper>
                      <Tag
                        options={doorTypesFilter}
                        name='door_types'
                        control={control}
                        height='h-10'
                        append={appendDoorType}
                      />
                    </ListWrapper>
                  </SectionWrapper>
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal'>
                      წამყვანი საბურავები
                    </Typography>
                    <ListWrapper>
                      <Tag
                        options={driveTiresFilter}
                        name='drive_tires'
                        control={control}
                        height='h-10'
                        append={appendDriveTire}
                      />
                    </ListWrapper>
                  </SectionWrapper>
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal'>
                      ტრანსმისია
                    </Typography>
                    <ListWrapper>
                      <Tag
                        options={transmisisonTypesFilter}
                        name='transmission_types'
                        control={control}
                        height='h-10'
                        append={appendTransmissionType}
                      />
                    </ListWrapper>
                  </SectionWrapper>
                  <Divider />

                  <Typography type='h5' weight='normal' className='mt-8'>
                    დამატებითი პარამეტრები
                  </Typography>
                  <Typography type='body' color='light'>
                    შეგიძლია მონიშნო ერთი ან რამდენიმე პარამეტრი
                  </Typography>
                  {/* <div className='py-9 grid grid-cols-2'>
                    {additionalParameters.map(parameter => (
                      <div className='my-2' key={parameter.id}>
                        <Checkbox title={parameter.label} name='' control={control} />
                      </div>
                    ))}
                  </div> */}
                  <div className='my-2'>
                    <CheckboxField
                      name={'additional_information'}
                      control={control}
                      options={additionalInformationFilters}
                      append={() => appendAdditionalInformation()}
                    />
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
