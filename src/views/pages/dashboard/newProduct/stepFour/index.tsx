import { useState } from 'react'
import { useWatch } from 'react-hook-form'
import { NewService } from 'src/types/Product'
import { IconTextButton } from 'src/views/components/button'
import Counter from 'src/views/components/counter'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import SwitchField from 'src/views/components/switchField'
import TwoOptionSelector from 'src/views/components/twoOptionSelector'
import Typography from 'src/views/components/typography'
import useProductInfo from '../useProductInfo'
import AddNewServiceModal from './addNewServiceModal'

interface Props {
  control: any
  step: number
}

const StepFour: React.FC<Props> = ({ control, step }) => {
  const { companyServices } = useProductInfo(step)
  const [newServiceModal, setNewServiceModal] = useState(false)

  const handleNewServiceModal = () => setNewServiceModal(!newServiceModal)

  const formState = useWatch({ control })

  const renderServiceComponent = (service: NewService, index: number) => {
    if (service.type_id === 1 || 2) {
      return (
        <div className='mb-8'>
          <Typography type='subtitle' className='text-black font-bold mt-9 mb-2'>
            ღირებულება
          </Typography>
          <div className='flex justify-between items-center w-full gag-6'>
            <Typography type='body' className='w-7/12'>
              მითითებული ფასი განსაზღვრავს დამატებითი სერვისისის 1 დღის ქირაობის ფასს, რომლის ცვალებადობაც დამოკიდებული
              იქნება დღეების რაოდენობასზე
            </Typography>
            <div className='flex gap-4 justify-center'>
              <DefaultInput
                label='ერთჯერადი ღირებულება'
                className='!w-64'
                control={control}
                name={`company_services?.${index}.price`}
              />
              <TwoOptionSelector
                control={control}
                name={`company_services.${index}.currency`}
                options={[
                  { value: 'GEL', icon: 'gel', width: '11', height: '12' },
                  { value: 'USD', icon: 'usd', width: '7', height: '12' }
                ]}
              />
            </div>
          </div>

          <Typography type='subtitle' className='text-black font-bold mt-12 mb-2'>
            რაოდენობა
          </Typography>
          <div className='flex justify-between items-center w-full gag-6'>
            <Typography type='body' className='w-7/12'>
              მითითებული რაოდენობა განსაზღვრავს დამატებითი სერვისისის 1 დღის ქირაობის ფასს, რომლის ცვალებადობაც
              დამოკიდებული იქნება დღეების რაოდენობასზე
            </Typography>
            <div className='flex justify-center items-center border border-px-raisin-130 w-64 rounded-2xl h-14'>
              <Counter control={control} name={`company_services?.${index}.quantity`} />
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <div>
        <IconTextButton
          label='ახალი სერვისის დამატება'
          icon='/icons/add.svg'
          onClick={handleNewServiceModal}
          className='p-0 mb-12'
        />
        <Typography type='h4' weight='normal' color='dark'>
          სერვისების ჩამონათვალი
        </Typography>
        <div className='mt-14'>
          {companyServices?.map((service: NewService, index: number) => (
            <div key={service?.id}>
              <SwitchField
                label={service.title}
                className='my-8'
                description={service.description}
                control={control}
                name={`company_services.${index}`}
                defaultValue={false}
                key={service.id}
              />
              {formState.company_services[index] && renderServiceComponent(service, index)}
              <Divider />
            </div>
          ))}
        </div>
      </div>
      <AddNewServiceModal open={newServiceModal} onClose={handleNewServiceModal} />
    </>
  )
}

export default StepFour
