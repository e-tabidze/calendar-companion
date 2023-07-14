import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from 'react'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import SwitchField from 'src/views/components/switchField'
import Typography from 'src/views/components/typography'
import AddNewServiceModal from './addNewServiceModal'

const components = [
  <SwitchField
    label='უფასო მიწოდება - ავტომობილს მოყვანა სასურველ ადგილზე'
    value={false}
    onChange={() => console.log('value')}
    key="1"
  />,
  <SwitchField
    label='უფასო მიწოდება - ავტომობილს მოყვანა სასურველ ადგილზე'
    value={false}
    onChange={() => console.log('value')}
    key="2"
  />,
  <SwitchField
    label='უფასო მიწოდება - ავტომობილს მოყვანა სასურველ ადგილზე'
    value={false}
    onChange={() => console.log('value')}
    key="3"
  />,
  <SwitchField
    label='უფასო მიწოდება - ავტომობილს მოყვანა სასურველ ადგილზე'
    value={false}
    onChange={() => console.log('value')}
    key="4"
  />
]

const StepFour = () => {
  const [serviceComponents] = useState<any>(components)
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
          {serviceComponents.map(
            (component: ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal, index: number) => (
              <div className='flex flex-col gap-9 mt-9' key={index}>
                {component} <Divider />
              </div>
            )
          )}
        </div>
      </div>
      <AddNewServiceModal open={newServiceModal} onClose={handleNewServiceModal} />
    </>
  )
}

export default StepFour
