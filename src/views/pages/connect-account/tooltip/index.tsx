import { useState } from 'react'
import CustomTooltip from 'src/views/components/tooltip'

interface Props {
  id: string
}

const Tooltip: React.FC<Props> = ({ id }) => {
  const totalPages = 3
  const [page, setPage] = useState(1)
  const [isTooltipVisible, setIsTooltipVisible] = useState(true) // State to manage tooltip visibility

  const handleNext = () => {
    setPage(prev => Math.min(prev + 1, totalPages))
  }

  const handleDone = () => {
    setIsTooltipVisible(false) // Hide tooltip when "Got it!" is clicked
  }

  const getTooltipContent = () => {
    return (
      <>
        {page === 1 && (
          <p>
            The primary calendar associated with your Gmail account is automatically imported and will be visible to
            your workspace members.
          </p>
        )}
        {page === 2 && (
          <p>
            You can also import other calendars from your Gmail account and choose to make them either private or
            public.
          </p>
        )}
        {page === 3 && (
          <p>
            Private calendars will be visible only to you, while public calendars can be seen by your teammates as well.
          </p>
        )}
      </>
    )
  }

  return (
    <>
      {isTooltipVisible && ( // Conditional rendering to show/hide tooltip
        <CustomTooltip id={id} place='top'>
          <div className='text-gray-700 mb-4'>{getTooltipContent()}</div>
          <div className='flex justify-between items-center'>
            <div className='flex space-x-1'>
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full ${page === index + 1 ? 'bg-orange-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            {page < totalPages ? (
              <div
                onClick={handleNext}
                className='bg-orange-500 !z-50 text-white px-4 py-2 rounded-md hover:bg-orange-600 cursor-pointer'
              >
                Next
              </div>
            ) : (
              <div
                onClick={handleDone}
                className='bg-orange-500 !z-50 text-white px-4 py-2 rounded-md hover:bg-orange-600 cursor-pointer'
              >
                Got it!
              </div>
            )}
          </div>
        </CustomTooltip>
      )}
    </>
  )
}

export default Tooltip
