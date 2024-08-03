import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

const StepOne = () => {
  return (
    <UnauthorizedLayout>
      <div>
        <Typography type='h1'>It's nice to meet you!</Typography>
        <Typography type='h5' color='light'>
          This is how your teammates will know you on our platform
        </Typography>
      </div>

      <DefaultButton text='Next Step' bg='bg-purple-100' />
    </UnauthorizedLayout>
  )
}

export default StepOne
