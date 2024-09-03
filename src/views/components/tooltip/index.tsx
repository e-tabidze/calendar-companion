import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'

interface TooltipProps {
  id: string
  place?: 'top' | 'right' | 'bottom' | 'left'
  currentPage: number
  totalPages: number
  onNext: () => void
  onDone: () => void
}

const CustomTooltip: React.FC<TooltipProps> = ({ id, place = 'top', currentPage, totalPages, onNext, onDone }) => {
  const [page, setPage] = useState(currentPage)

  const handleNext = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1)
      onNext()
    }
  }

  const handleDone = () => {
    if (page === totalPages) {
      onDone()
    }
  }

  const getContent = () => {
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
      <a data-tooltip-id={id}>{/* ◕‿‿◕ */}</a>
      <Tooltip
        id={id}
        place={place}
        clickable
        className='p-4 !bg-white !rounded-xl !shadow-2xl w-72 !opacity-100 !max-w-[280px] !text-left !z-50'
      >
        <div className='text-gray-700 mb-4'>{getContent()}</div>
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
            <button
              onClick={handleNext}
              className='bg-orange-500 !z-50 text-white px-4 py-2 rounded-md hover:bg-orange-600'
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleDone}
              className='bg-orange-500 !z-50 text-white px-4 py-2 rounded-md hover:bg-orange-600'
            >
              Got it!
            </button>
          )}
        </div>
      </Tooltip>
    </>
  )
}

export default CustomTooltip
