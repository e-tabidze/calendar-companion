import { Fragment, useEffect } from 'react'

// CustomHooks
import useWindowDimensions from 'src/hooks/useWindowDimensions'

// Components
import CategoryCard from '../categoryCard'
import Divider from '../divider'
import { DefaultInput } from '../input'
import Tag from '../tag'
import Typography from '../typography'

// Libraries
import { Dialog, Transition } from '@headlessui/react'

// Styles
import { ListWrapper, SectionWrapper } from './styles'
import SwitchField from '../switchField'
import useFilters, { getManufacturerModelFilters } from 'src/hooks/useFilters'
import SelectField from '../selectField'
import CheckboxField from '../checkboxField'
import { IconTextButton } from '../button'
import { useQuery } from '@tanstack/react-query'
import useSearch from 'src/hooks/useSearch'
import { useWatch } from 'react-hook-form'
import Icon from 'src/views/app/Icon'

interface Props {
  open: boolean
  toggleModal: () => void
  control: any
  appendFuelType: any
  appendSeatType: any
  appendLuggageNumber: any
  appendCategory: any
  appendDriveTire: any
  appendDoorType: any
  appendTransmissionType: any
  appendAdditionalInformation: any
  onSubmit: () => void
  reset: any
}

const AdditionalFilters: React.FC<Props> = ({
  open,
  toggleModal,
  control,
  appendFuelType,
  appendSeatType,
  appendLuggageNumber,
  appendCategory,
  appendDriveTire,
  appendDoorType,
  appendTransmissionType,
  appendAdditionalInformation,
  onSubmit,
  reset
}) => {
  const { width } = useWindowDimensions()
  const {
    categoriesFilter,
    fuelTypesFilter,
    seatTypesFilter,
    doorTypesFilter,
    driveTiresFilter,
    transmisisonTypesFilter,
    luggageNumbers,
    additionalInformationFilters,
    manufacturerFilters
  } = useFilters()

  const { objectToURI } = useSearch()

  const formState = useWatch({ control })

  const generateYearsArray = () => {
    const currentYear = new Date().getFullYear()
    const startYear = 1980
    const years = []
    for (let i = currentYear; i >= startYear; i--) {
      years.push({ value: i, label: i })
    }

    return years
  }

  const { data: manufacturerModelFilters, refetch }: any = useQuery({
    queryKey: ['manufacturerModelFilters'],
    queryFn: () => getManufacturerModelFilters(objectToURI({ manufacturer_id: formState.manufacturer_id })),
    staleTime: Infinity,
    enabled: formState.manufacturer_id?.length > 0
  })

  useEffect(() => {
    if (formState.manufacturer_id?.length > 0) {
      refetch()
    }
  }, [formState.manufacturer_id, refetch])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-[111]' onClose={toggleModal}>
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

        <div className='fixed inset-0 z-10 md:h-screen overflow-y-auto'>
          <div className='absolute left-1/2 -translate-x-1/2 w-full max-w-[790px] flex min-h-full items-end justify-center text-center md:items-center md:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-br-3xl bg-white text-left shadow-xl transition-all w-full md:my-4 md:max-w-3xl'>
                <div className='w-full flex justify-between items-center px-4 py-5 sm:py-6 sm:px-10 border-b-1 border-grey-90'>
                  <Dialog.Title as='h3' className='text-2md text-base-100 leading-6'>
                    დამატებითი ფილტრები
                  </Dialog.Title>
                  <Icon svgPath='close' onClick={toggleModal} height={40} width={40} className='cursor-pointer' />
                </div>
                <div className='overflow-auto h-[70vh] px-4 py-5 sm:py-6 sm:px-10 w-max-full'>
                  <Typography type='body' color='dark' className='md:max-w-[30%]'>
                    ავტომობილები დღიური ფასის მიხედვით
                  </Typography>
                  <div className='w-full flex flex-col md:flex-row md:items-center mb-10 md:mb-20 mt-8'>
                    <DefaultInput
                      name='price_min'
                      control={control}
                      label={width > 641 ? 'მინიმუმ ფასი დღიურად' : 'მინ. ფასი დღიურად'}
                      errors={''}
                      className='md:w-52 mb-[8px] md:mb-0'
                      type='number'
                      min={0}
                    />
                    <div className='hidden md:flex w-3 h-px bg-base-100 mx-2' />
                    <DefaultInput
                      name='price_max'
                      control={control}
                      label={width > 641 ? 'მაქსიმუმ ფასი დღიურად' : 'მაქს. ფასი დღიურად'}
                      errors={''}
                      className='md:w-52'
                      type='number'
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
                        <div className='flex flex-wrap gap-2 my-3 md:gap-4 md:my-6'>
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
                          isMulti
                          control={control}
                          valueKey='id'
                          labelKey='title'
                          name='category'
                          options={categoriesFilter}
                          placeholder='კატეგორია'
                          className='my-2'
                        />
                      )}
                    </>
                  </div>
                  <div className='my-6 md:my-12'>
                    <Typography type='h5' weight='normal'>
                      ავტომობილის პარამეტრები
                    </Typography>
                    <SelectField
                      name='manufacturer_id'
                      isMulti
                      control={control}
                      options={manufacturerFilters}
                      placeholder='მწარმოებელი'
                      className='my-2'
                      valueKey='id'
                      labelKey='title'
                    />
                    <SelectField
                      name='model_id'
                      isMulti
                      control={control}
                      options={manufacturerModelFilters?.result?.data}
                      placeholder='მოდელი'
                      disabled={formState.manufacturer_id?.length === 0}
                      className='my-2'
                      valueKey='id'
                      labelKey='title'
                    />
                    <div className='flex gap-4 items-center'>
                      <SelectField
                        name='year_from'
                        control={control}
                        options={generateYearsArray()}
                        placeholder='წლიდან'
                        disabled={false}
                        className='my-2'
                        valueKey='value'
                        labelKey='label'
                      />
                      -
                      <SelectField
                        name='year_to'
                        control={control}
                        options={generateYearsArray()}
                        placeholder='წლამდე'
                        disabled={false}
                        className='my-2'
                        valueKey='value'
                        labelKey='label'
                      />
                    </div>
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
                      outlined
                    />
                  </div>

                  <Typography type='h5' weight='normal'>
                    ადგილების რაოდენობა
                  </Typography>
                  <div className='flex flex-wrap gap-2 my-3 md:gap-4 md:my-6'>
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
                  <div className='flex flex-wrap gap-2 my-3 md:gap-4 md:my-6'>
                    <Tag
                      options={luggageNumbers}
                      height='h-10'
                      name='luggage_numbers'
                      control={control}
                      append={appendLuggageNumber}
                    />
                  </div>
                  <Divider />
                  <SwitchField label='უფასო მიწოდება' name='free_delivery' control={control} className='my-4 md:my-8' />
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal' className='mb-[8px] md:mb-0'>
                      კარის რაოდენობა
                    </Typography>
                    <ListWrapper>
                      <Tag
                        options={doorTypesFilter}
                        name='door_types'
                        control={control}
                        height='h-10'
                        append={appendDoorType}
                        outlined
                      />
                    </ListWrapper>
                  </SectionWrapper>
                  <Divider />

                  <SectionWrapper>
                    <Typography type='h5' weight='normal' className='mb-[8px] md:mb-0'>
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
                    <Typography type='h5' weight='normal' className='mb-[8px] md:mb-0'>
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

                  <Typography type='h5' weight='normal' className='mt-4 md:mt-8'>
                    დამატებითი პარამეტრები
                  </Typography>

                  <Typography type='body' weight='normal' color='light' className="mt-2 mb-8">
                    შეგიძლია მონიშნო ერთი ან რამდენიმე პარამეტრი
                  </Typography>

                  <CheckboxField
                    name='additional_information'
                    control={control}
                    options={additionalInformationFilters}
                    append={() => appendAdditionalInformation()}
                    className='my-2'
                  />
                </div>
                <div className='w-full flex flex-row items-center justify-between py-4 px-4 md:px-10 border-t-1 border-grey-90'>
                  <IconTextButton label='გასუფთავება' icon='/icons/return.svg' onClick={() => reset()} />
                  <div className='flex items-center justify-between md:justify-start [text-16px] gap-4'>
                    {/* სულ 136 შედეგი */}
                    <IconTextButton
                      label='ძებნა'
                      bg='bg-orange-100'
                      className='text-white'
                      icon='/icons/search.svg'
                      type='submit'
                      onClick={() => {
                        onSubmit()
                        toggleModal()
                      }}
                    />
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
