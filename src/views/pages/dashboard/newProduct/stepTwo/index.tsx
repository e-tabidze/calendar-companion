import { Key, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import CategoryCard from 'src/views/components/categoryCard'
import Checkbox from 'src/views/components/checkbox'
import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import SelectField from 'src/views/components/selectField'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'
import useProductInfo from '../useProductInfo'

interface Props {
  control: any
}

const seats = ['ნებისმიერი', '1', '2', '3', '4', '5', '6', '7', '8+']

const tires = ['წინა', 'უკანა', '4x4']

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

const StepTwo: React.FC<Props> = ({ control }) => {
  const [selectedCategories, setSelectedCategoris] = useState<any[]>([])
  const { width } = useWindowDimensions()

  const { productDetails } = useProductInfo()

  const handleSelectCategories = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategoris(selectedCategories.filter(category => category !== id))
    } else {
      setSelectedCategoris(prevState => [...prevState, id])
    }
  }

  return (
    <div>
      <Typography type='h4' color='dark'>
        ავტომობილის კატეგორია
      </Typography>
      {width > 779 ? (
        <div className='flex flex-wrap gap-4 my-6'>
          {productDetails?.categories?.map((category: { title: string; id: number }) => (
            <CategoryCard
              border
              category={category.title}
              key={category.id}
              selected={selectedCategories.includes(category.id)}
              handleSelect={() => handleSelectCategories(category.id)}
            />
          ))}
        </div>
      ) : (
        <SelectField
          control={control}
          name=''
          options={productDetails?.categories}
          placeholder='კატეგორია'
          valueKey='id'
          labelKey='title'
        />
      )}

      <Typography type='h4' color='dark' className='mt-14'>
        საწვავის ტიპი
      </Typography>
      <div className='flex flex-wrap gap-3 my-6'>
        {productDetails?.fuel_types?.map((fuel: { title: string; id: Key }) => (
          <Tag label={fuel.title} key={fuel.id} component={<Image src='/icons/electric.svg' alt='' />} height='h-12' />
        ))}
      </div>
      <Typography type='h5' weight='normal' className=' mt-14'>
        ადგილების რაოდენობა
      </Typography>
      <div className='flex flex-wrap gap-4 my-6'>
        {productDetails?.seat_types.map((seat: { title: string; id: Key }) => (
          <Tag label={seat.title} key={seat.id} height='h-10' />
        ))}
      </div>
      <Typography type='h5' weight='normal' className=' mt-14'>
        ჩემოდნების რაოდენობა
      </Typography>
      <div className='flex flex-wrap gap-4 my-6'>
        {seats.map((place, idx) => (
          <Tag label={place} key={idx} height='h-10' />
        ))}
      </div>
      <Divider />
      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className=' mb-4 md:mb-0'>
          კარის რაოდენობა
        </Typography>
        <div className='flex w-max gap-2'>
          {productDetails?.door_types.map((door: { title: string; id: Key }) => (
            <Tag label={door.title} key={door.id} component={<Image src='/icons/doors.svg' alt='' />} height='h-12' />
          ))}
        </div>
      </div>

      <Divider />

      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className='mb-4 md:mb-0'>
          წამყვანი საბურავები
        </Typography>
        <div className='flex w-max gap-2'>
          {tires.map((type, idx) => (
            <Tag label={type} key={idx} height='h-10' />
          ))}
        </div>
      </div>
      <Divider />

      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className='mb-4 md:mb-0'>
          ტრანსმისია
        </Typography>
        <div className='flex w-max gap-2'>
          {productDetails?.transmission_types?.map((transmission: { title: string; id: Key }) => (
            <Tag label={transmission.title} key={transmission.id} height={'h-10'} />
          ))}
        </div>
      </div>
      <Divider />

      <Typography type='h5' weight='normal' className='mt-6'>
        დამატებითი პარამეტრები
      </Typography>
      <Typography type='body' color='light'>
        შეგიძლია მონიშნო ერთი ან რამდენიმე პარამეტრი
      </Typography>
      <div className='py-9 grid grid-cols-1 md:grid-cols-2'>
        {additionalParameters.map(parameter => (
          <div className='my-2' key={parameter.id}>
            <Checkbox label={parameter.label} value={parameter.label} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepTwo
