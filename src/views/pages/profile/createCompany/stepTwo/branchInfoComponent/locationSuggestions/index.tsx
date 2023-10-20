import React from 'react'
import Typography from 'src/views/components/typography'

interface Props {
  options: any
  isLoading: boolean
  onClick: (option: any) => void
}

const LocationSuggestions: React.FC<Props> = ({ options, isLoading, onClick }) => {
  return (
    <ul className='absolute left-0 top-16 z-10 w-full border border-raisin-10 rounded-xl bg-white max-h-36 overflow-y-auto'>
      {isLoading ? (
        <>Loading</>
      ) : (
        <>
          {options.map((option: any, optionIndex: number) => (
            <li
              key={`${option?.locations}`}
              className='px-2 cursor-pointer hover-bg-grey-100'
              onClick={() => onClick(option)}
            >
              {option.locations.map((item: any, index: any) => (
                <Typography type='body' key={index} className='p-1 inline'>
                  {item}
                </Typography>
              ))}
            </li>
          ))}
        </>
      )}
    </ul>
  )
}

export default LocationSuggestions
