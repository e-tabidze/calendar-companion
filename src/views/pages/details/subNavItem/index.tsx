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
      className={`tab-underline px-4 py-6 text-raisin-130 cursor-pointer text-sm md:text-2sm block relative after:absolute after:bottom-0 ${
        isActive
          ? 'active'
          : ''
      }`}
      onClick={handleClickSection}
    >
      {children}
    </Typography>
  )
}

export default SubNavItem
