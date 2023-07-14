import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'

const Transaction = () => {
  return (
    <div>
      <div className='flex items-center justify-between my-3'>
        <div className='flex fle-col large:gap-10 large:items-center large:flex-row'>
          <Typography type='body' color='light'>
            05 ივლ 2022
          </Typography>
          <Typography type='subtitle'>თანხის გადახდა</Typography>
        </div>
        <Typography type='h5'>-340$</Typography>
      </div>
      <Divider />
    </div>
  )
}

export default Transaction
