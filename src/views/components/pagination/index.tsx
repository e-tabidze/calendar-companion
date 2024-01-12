import React from 'react'
import { DefaultButton, IconButton } from '../button'

interface Props {
  totalPages: number
  onPageChange: (pageNumber: number) => void
  currentPage: number
}

const Pagination: React.FC<Props> = ({ totalPages, onPageChange, currentPage }) => {
  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 3
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <DefaultButton
          text={i}
          key={i}
          onClick={() => onPageChange(i)}
          className={`!w-8 !h-8 md:!w-10 md:!h-10 !px-0 !py-0 mx-[6px] !font-medium ${
            i == currentPage
              ? 'bg-white border border-raisin-130'
              : currentPage == undefined
              ? 'default-style'
              : 'bg-raisin-10 border border-raisin-10'
          }`}
        />
      )
    }

    return pageNumbers
  }

  const handlePreviousPage = () => {
    if (currentPage >= 0) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className='flex items-center justify-between my-10'>
      <IconButton
        icon='pagination-prev'
        height={24}
        width={24}
        className={`md:hidden bg-raisin-10 h-8 px-2 rounded-lg ${
          currentPage == 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handlePreviousPage}
        type='button'
      />
      <DefaultButton
        text='უკან'
        onClick={handlePreviousPage}
        className={`hidden md:flex bg-raisin-10 !h-14 !px-8 !font-medium ${
          currentPage == 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={currentPage === 1}
      />
      <div>{renderPageNumbers()}</div>
      <IconButton
        icon='pagination-next'
        height={24}
        width={24}
        className={`md:hidden bg-raisin-10 h-8 px-2 rounded-lg ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleNextPage}
        type='button'
      />
      <DefaultButton
        text='შემდეგი'
        onClick={handleNextPage}
        className={`hidden md:flex bg-raisin-10 !h-14 !px-8 !font-medium ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}

export default Pagination
