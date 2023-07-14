import { useState } from 'react'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import Tag from 'src/views/components/tag'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { ActionsWrapper, TagsWrapper } from './styles'

const fuelType = [
  {
    id: 1,
    label: 'ელექტრო'
  },
  {
    id: 2,
    label: 'ჰიბრიდი'
  },
  {
    id: 3,
    label: 'დატენვადი ჰიბრიდი'
  },
  {
    id: 4,
    label: 'დიზელი'
  },
  {
    id: 5,
    label: 'გაზი'
  }
]

const FuelTypePopover = () => {
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<any[]>([])

  const handleSelectCategories = (id: number) => {
    if (selectedFuelTypes.includes(id)) {
      setSelectedFuelTypes(selectedFuelTypes.filter(category => category !== id))
    } else {
      setSelectedFuelTypes(prevState => [...prevState, id])
    }
  }

  return (
    <PopoverDropdown label='საწვავის ტიპი' maxWidth='max-w-sm'>
      <Typography type='body' color='light'>
        შეგიძლიათ მონიშნოთ ერთი ან რამდენიმე
      </Typography>
      <TagsWrapper>
        {fuelType.map((type, idx) => (
          <Tag
            label={type.label}
            key={idx}
            component={<Image src='/icons/electric.svg' alt="" />}
            height='h-12'
            handleClick={() => handleSelectCategories(type.id)}
            selected={selectedFuelTypes.includes(type.id)}
          />
        ))}
      </TagsWrapper>
      <ActionsWrapper>
        <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
        <DefaultButton text='შენახვა' bg='bg-orange-100' textColor="text-white" />
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default FuelTypePopover
