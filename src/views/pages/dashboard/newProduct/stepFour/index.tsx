import { useState } from 'react'
import { Service } from 'src/types/Product'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import SwitchField from 'src/views/components/switchField'
import Typography from 'src/views/components/typography'
import useProductInfo from '../useProductInfo'
import AddNewServiceModal from './addNewServiceModal'

interface Props {
  control: any
}

const StepFour: React.FC<Props> = ({ control }) => {
  const { companyServices } = useProductInfo()
  const [newServiceModal, setNewServiceModal] = useState(false)

  const handleNewServiceModal = () => setNewServiceModal(!newServiceModal)

  return (
    <>
      <div>
        <IconTextButton
          label='ახალი ფასდაკლების დამატება'
          icon='/icons/add.svg'
          onClick={handleNewServiceModal}
          className='p-0 mb-12'
        />
        <Typography type='h4' weight='normal' color='dark'>
          სერვისების ჩამონათვალი
        </Typography>
        <div className='mt-14'>
          {companyServices?.map((service: Service) => (
            <>
              <SwitchField
                label={service.title}
                className='my-8'
                description={service.description}
                control={control}
                name={`service.${Math.random()}`}
                defaultValue={false}
              />
              <Divider />
            </>
          ))}
        </div>
      </div>
      <AddNewServiceModal open={newServiceModal} onClose={handleNewServiceModal} />
    </>
  )
}

export default StepFour
