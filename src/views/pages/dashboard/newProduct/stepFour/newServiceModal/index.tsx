import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton, IconButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import SelectField from 'src/views/components/selectField'
import Cookie from 'src/helpers/Cookie'
import useNewService from './useNewService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewService } from 'src/types/Product'

interface Props {
  open: boolean
  onClose: () => void
}

const NewServiceModal: React.FC<Props> = ({ open, onClose }) => {
  const { control, handleSubmit, createNewService, serviceValues } = useNewService()

  const options = [
    {
      value: 1,
      label: 'დღიურ ფასიანი'
    },
    {
      value: 2,
      label: 'ერთჯერად ფასიანი'
    },
    {
      value: 3,
      label: 'უფასო'
    }
  ]

  // const onSubmit = async () => {
  //   try {
  //     console.log(serviceValues, 'serviceValues')
  //     await createNewService(serviceValues, Cookie.get('AccessToken'))
  //   } catch (error) {
  //     console.error('An error occurred while creating new listing:', error)
  //   }
  // }

  const queryClient = useQueryClient()

  const createNewServiceMutation = useMutation(
    (newServiceData: NewService) => {
      return createNewService(newServiceData, Cookie.get('AccessToken'))
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the service list query after a successful mutation
        queryClient.invalidateQueries(['serviceList']) // Adjust 'serviceList' to your actual query key
        onClose() // Close the modal
      }
    }
  )

  const onSubmit = () => {
    createNewServiceMutation.mutate(serviceValues)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Dialog.Title as='h3' className='w-full flex items-center justify-between px-10 py-6'>
                    <Typography type='h5' weight='normal' className='text-2md'>
                      ახალი სერვისის დამატება
                    </Typography>
                    <IconButton icon='/icons/close.svg' onClick={onClose} width={40} height={40} />
                  </Dialog.Title>
                  <Divider />
                  <div className='p-6 mb-20'>
                    <div className='flex flex-col gap-4'>
                      <DefaultInput label='სერვისის დასახელება' control={control} name='title' />
                      <DefaultInput label='აღწერა' control={control} name='description' rows={4} />
                    </div>
                    <SelectField options={options} control={control} name='type_id' />
                  </div>
                  <div className='flex justify-end absolute bottom-0 w-full shadow-md'>
                    <DefaultButton
                      type='submit'
                      text='დამატება'
                      bg='bg-green-100'
                      className='my-4 mr-10'
                      textColor='text-white'
                    ></DefaultButton>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default NewServiceModal
