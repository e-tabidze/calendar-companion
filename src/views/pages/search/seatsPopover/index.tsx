import { useState } from 'react'
import { IconButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'
import { TagsWrapper } from './styles'

const seats = [
  {
    id: 1,
    label: 'ნებისმიერი'
  },
  {
    id: 2,
    label: '1'
  },
  {
    id: 3,
    label: '2'
  },
  {
    id: 4,
    label: '3'
  },
  {
    id: 5,
    label: '4'
  },
  {
    id: 6,
    label: '5'
  },
  {
    id: 7,
    label: '6'
  },
  {
    id: 8,
    label: '7'
  },
  {
    id: 9,
    label: '8+'
  }
]

const SeatsPopover = () => {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([1])

  const handleSelectedSeats = (id: number) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter(type => type !== id))
    } else {
      setSelectedSeats(prevState => [...prevState, id])
    }
  }

  return (
    <PopoverDropdown label='ადგილების რაოდენობა' maxWidth='max-w-xs'>
      <TagsWrapper>
        {seats.map(seat => (
          <Tag
            label={seat.label}
            key={seat.id}
            height='h-10'
            selected={selectedSeats.includes(seat.id)}
            handleClick={() => handleSelectedSeats(seat.id)}
          />
        ))}
      </TagsWrapper>
      <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
    </PopoverDropdown>
  )
}

export default SeatsPopover
