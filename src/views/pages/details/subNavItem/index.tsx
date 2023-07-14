import React from 'react'
import Typography from 'src/views/components/typography'

interface SubNavItemProps {
  section: string
  activeSection: string
  handleClick: (section: string) => void
  children: React.ReactNode
}

const SubNavItem: React.FC<SubNavItemProps> = ({ section, activeSection, handleClick, children }) => {
  const isActive = section === activeSection

  const handleClickSection = () => {
    handleClick(section)
  }

  return (
    <Typography
      type='subtitle'
      className={`text-raisin-130 cursor-pointer text-sm large:text-2sm block relative after:absolute after:bottom-0 ${
        isActive
          ? 'after:left-0 after:w-full after:h-[3px] after:bg-orange-100 after:rounded-xl after:top-[42px] after:z-40'
          : ''
      }`}
      onClick={handleClickSection}
    >
      {children}
    </Typography>
  )
}

export default SubNavItem
