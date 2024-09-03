import { Tooltip } from 'react-tooltip'

interface TooltipProps {
  id: string
  place?: 'top' | 'right' | 'bottom' | 'left'
  children: any
}

const CustomTooltip: React.FC<TooltipProps> = ({ id, place = 'top', children }) => {
  return (
    <>
      <a data-tooltip-id={id}>{/* ◕‿‿◕ */}</a>
      <Tooltip
        id={id}
        place={place}
        clickable
        className='p-4 !bg-white !rounded-xl !shadow-2xl w-72 !opacity-100 !max-w-[280px] !text-left !z-50'
      >
        {children}
      </Tooltip>
    </>
  )
}

export default CustomTooltip
