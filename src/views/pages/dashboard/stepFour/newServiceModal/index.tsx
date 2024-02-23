import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import useNewService from './useNewService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewService } from 'src/types/Product'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })

interface Props {
  open: boolean
  onClose: () => void
}

const NewServiceModal: React.FC<Props> = ({ open, onClose }) => {
  const { control, handleSubmit, createNewService, serviceValues, errors } = useNewService()
  const {t} = useTranslation()

  const options = [
    {
      value: 1,
      label: t('daily_priced')
    },
    {
      value: 2,
      label: t('one_time_price')
    },
    {
      value: 3,
      label: t('price_free')
    }
  ]

  const queryClient = useQueryClient()

  const createNewServiceMutation = useMutation(
    (newServiceData: NewService) => {
      return createNewService(newServiceData, '')
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['companyServices'])
        onClose()
      }
    }
  )

  const onSubmit = () => {
    createNewServiceMutation.mutate(serviceValues)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-[111]' onClose={onClose}>
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
          <div className='flex items-center justify-center p-4 text-center'>
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
                    {t('add_new_service')}
                    <IconButton icon='close' onClick={onClose} width={40} height={40} className='cursor-pointer' />
                  </Dialog.Title>
                  <Divider />
                  <div className='p-6 mb-40 flex flex-col gap-4'>
                    <DefaultInput label={t('service_name')} control={control} name='title' errors={errors} />
                    <DefaultInput label={t('description')} control={control} name='description' rows={4} errors={errors} />
                    <SelectField
                      options={options}
                      control={control}
                      name='type_id'
                      errors={errors}
                      valueKey='value'
                      placeholder={t('select_service_type')}
                      labelKey='label'
                    />
                  </div>
                  <div className='flex justify-end absolute bottom-0 w-full shadow-md'>
                    <DefaultButton
                      type='submit'
                      text={t('add')}
                      bg='bg-green-100'
                      className='my-4 mr-10'
                      textColor='text-white'
                      disabled={createNewServiceMutation.isLoading}
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
