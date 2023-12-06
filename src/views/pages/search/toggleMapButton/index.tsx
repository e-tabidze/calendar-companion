import { ToggleMapBtn } from './styles'
import Icon from "src/views/app/Icon";

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
         <Icon svgPath='chevron-right' width={20} height={20} className="fill-transparent" />
      </span>
    </ToggleMapBtn>
  )
}

export default ToggleMapButton
