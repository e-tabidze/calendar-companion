import Typography from '../typography'

interface Props {
  label: string
  bg?: string
  component?: any
  height: 'h-10' | 'h-12'
  handleClick?: any
  selected?: boolean
  className?: string
}

const Tag: React.FC<Props> = ({ bg, label, component, height, handleClick, selected, className }) => {
  return (
    <div
      className={`flex items-center w-max ${height} ${
        selected ? (height === 'h-12' ? `${bg}` : 'bg-green-100') : `${bg}`
      }  ${component ? 'gap-3' : ''} ${component ? 'rounded-xl' : 'rounded-2xl'} ${
        selected ? (height === 'h-12' ? 'border border-raisin-90' : 'border border-green-100') : 'border border-gray-90'
      } px-4 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {component}
      <Typography type='body' className={`w-max ${selected && (height === 'h-12' ? '' : 'text-white')}`}>
        {label}
      </Typography>
    </div>
  )
}

export default Tag
