import { Tooltip } from 'react-tooltip'

interface TooltipProps {
  id: string
  children: React.ReactNode
  place?: 'top' | 'right' | 'bottom' | 'left'
}

const CustomTooltip: React.FC<TooltipProps> = ({ id, children, place = 'top' }) => {
  return (
    <>
      <a data-tooltip-id={id}>◕‿‿◕</a>
      <Tooltip id='my-tooltip' place={place}>
        {children}
      </Tooltip>
    </>
  )
}

export default CustomTooltip
