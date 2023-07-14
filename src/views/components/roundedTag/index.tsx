import Typography from '../typography'

interface Props {
  handleSelect: any
  selected: boolean
  label: string
}
const RoundedTag: React.FC<Props> = ({ handleSelect, selected, label }) => {
  return (
    <div
      className={`${selected ? 'bg-green-100' : 'bg-grey-110'} rounded-full h-12 w-12 flex items-center justify-center`}
      onClick={handleSelect}
    >
      <Typography type='subtitle' className='text-white'>
        {label}
      </Typography>
    </div>
  )
}

export default RoundedTag
