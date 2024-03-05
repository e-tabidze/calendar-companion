import React from 'react'
import { DefaultButton, IconButton } from '../button'
import {useTranslation} from "next-i18next";

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
          className={`!w-8 !h-8 md:!w-10 md:!h-10 !px-0 !py-0 mx-[6px] !font-medium transition-all ${
            i == currentPage
              ? 'bg-white border border-raisin-130'
              : currentPage == undefined
              ? 'default-style'
              : 'bg-raisin-10 border border-raisin-10 hover:border-raisin-100'
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
  const {t} = useTranslation()

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
        text={t('back')}
        onClick={handlePreviousPage}
        className={`hidden md:flex bg-raisin-10 !h-14 !px-8 !font-medium transition-all ${
          currentPage == 1 ? '!opacity-100 bg-raisin-5 border-raisin-5 text-raisin-40 cursor-not-allowed' : 'hover:border-raisin-100'
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
        text={t('next')}
        onClick={handleNextPage}
        className={`hidden md:flex bg-raisin-10 !h-14 !px-8 !font-medium  transition-all ${
          currentPage === totalPages ? '!opacity-100 bg-raisin-5 border-raisin-5 text-raisin-40 cursor-not-allowed' : 'hover:border-raisin-100'
        }`}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}

export default Pagination
