import { useState } from 'react'
import { IconButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'

const suitcases = [
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
const SuitcasesPopover = () => {
  const [selectedSuitcases, setSelectedSuitcases] = useState<any[]>([1])

  const handleSelectedSuitcases = (id: number) => {
    if (selectedSuitcases.includes(id)) {
      setSelectedSuitcases(selectedSuitcases.filter(type => type !== id))
    } else {
      setSelectedSuitcases(prevState => [...prevState, id])
    }
  }

  return (
    <PopoverDropdown label='ჩემოდნების რაოდენობა' maxWidth='max-w-xs'>
      <div className='flex flex-wrap gap-4 my-6'>
        {suitcases.map(suitcase => (
          <Tag
            label={suitcase.label}
            key={suitcase.id}
            height='h-10'
            handleClick={() => handleSelectedSuitcases(suitcase.id)}
            selected={selectedSuitcases.includes(suitcase.id)}
          />
        ))}
      </div>
      <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
    </PopoverDropdown>
  )
}

export default SuitcasesPopover
