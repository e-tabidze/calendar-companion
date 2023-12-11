import { useState } from 'react'
import { useWatch } from 'react-hook-form'
import { NewService } from 'src/types/Product'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import SwitchField from 'src/views/components/switchField'
import Typography from 'src/views/components/typography'
import useProductInfo from '../useProductInfo'
import NewServiceModal from './newServiceModal'
import ServiceDetails from './serviceDetails'

interface Props {
  control: any
  step: number
  errors: any
}

const StepFour: React.FC<Props> = ({ control, step, errors }) => {
  const { companyServices, isCompanyServicesLoading } = useProductInfo(step)
  const [newServiceModal, setNewServiceModal] = useState(false)

  const handleNewServiceModal = () => setNewServiceModal(!newServiceModal)

  const formState = useWatch({ control })

  const renderServiceDetails = (service: NewService, index: number) => {
    if (service.type_id === 1) {
      return (
        <ServiceDetails
          control={control}
          index={index}
          label='დღიური ფასი'
          errors={errors}
          description='მითითებული ფასი განსაზღვრავს დამატებითი სერვისისის 1 დღის ქირაობის ფასს, რომლის ცვალებადობაც დამოკიდებული
      იქნება დღეების რაოდენობასზე'
        />
      )
    }
    if (service.type_id === 2) {
      return (
        <ServiceDetails
          control={control}
          index={index}
          errors={errors}
          label='ერთჯერადი ფასი'
          description='მითითებული ფასი განსაზღვრავს დამატებითი სერვისისის ერთჯერად ფასს ფასს'
        />
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
          icon='add'
          width={20}
          height={20}
          onClick={handleNewServiceModal}
          className='p-0 mb-12'
          type="button"
        />
        <Typography type='h4' weight='normal' color='dark'>
          სერვისების ჩამონათვალი
        </Typography>
        <div className='mt-14'>
          {isCompanyServicesLoading ? (
            <>Loading...</>
          ) : (
            <>
              {companyServices?.map((service: NewService, index: number) => (
                <div key={index}>
                  <SwitchField
                    label={service.title}
                    className='my-8'
                    description={service.description}
                    control={control}
                    name={`company_services.${index}.isSelected`}
                  />
                  {formState.company_services[index]?.isSelected && renderServiceDetails(service, index)}
                  <Divider />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <NewServiceModal open={newServiceModal} onClose={handleNewServiceModal} />
    </>
  )
}

export default StepFour
