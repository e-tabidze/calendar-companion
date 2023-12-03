import Icon from 'src/views/app/Icon'
import { ToggleMapBtn } from './styles'

interface Props {
  onClick: () => void
  mapVisible: boolean
  classList?: boolean
}

const ToggleMapButton: React.FC<Props> = ({ onClick, mapVisible }) => {
  return (
    <ToggleMapBtn
      onClick={onClick}
      className={`shadow-sm absolute  mt-[93px] top-1/2 -translate-y-1/2 z-[11] bg-white ${
        mapVisible ? 'left-0 rounded-r-[8px] ' : 'right-0 rounded-l-[8px]'
      }`}
    >
      <span className={`${mapVisible ? '' : 'rotate-180'}`}>
        <Icon svgPath='chevronRight' width={8} height={14} />
      </span>
    </ToggleMapBtn>
  )
}

export default ToggleMapButton
