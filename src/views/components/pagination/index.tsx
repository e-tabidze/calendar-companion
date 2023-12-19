import React from 'react'
import { DefaultButton } from '../button'

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
          className={`w-10 h-10 px-0 py-0 mx-1 ${
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
    <div className='flex items-center justify-between my-4'>
      <DefaultButton
        text='უკან'
        onClick={handlePreviousPage}
        className={`${currentPage == 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <div>{renderPageNumbers()}</div>
      <DefaultButton
        text='შემდეგი'
        onClick={handleNextPage}
        className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  )
}

export default Pagination
