import Icon from 'src/views/app/Icon'
import Typography from '../typography'

interface Props {
  label: string
}

const DataPlaceHolder: React.FC<Props> = ({ label }) => {
  return (
    <div className='flex flex-col justify-center my-6 items-center gap-5'>
      <Icon svgPath='noOrders' width={207} height={156} />
      <Typography type='h5'>{label}</Typography>
    </div>
  )
}

export default DataPlaceHolder
