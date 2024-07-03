import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton } from 'src/views/components/button'
import Radio from 'src/views/components/radio'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useWatch } from 'react-hook-form'
import { DefaultInput } from 'src/views/components/input'
import useCancelReservation from 'src/views/pages/dashboard/companyOrders/cancelReservation/useCancelReservation'
import {useTranslation} from "next-i18next";

interface Props {
  open: boolean
  toggleModal: () => void
  orderId: number
  reasons: any[]
  orderStatus: number
}

const CancelReservationDialog: React.FC<Props> = ({ open, toggleModal, orderId, reasons, orderStatus }) => {
  const {t} = useTranslation()

  const { control, cancelReservation, cancelReservationValues, errors, isValid, reset } = useCancelReservation()

  const formState = useWatch({ control })

  const queryClient = useQueryClient()

  const cancelReservationMutation = useMutation(
    () => cancelReservation('', cancelReservationValues.cancel_reason, orderId, orderStatus),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['companyOrder'])
        queryClient.invalidateQueries(['companyOrders'])
        queryClient.invalidateQueries(['userOdersDetails'])
      }
    }
  )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-[111]'
        onClose={() => {
          toggleModal()
          reset()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 h-screen overflow-y-auto'>
          <div className='absolute left-1/2 -translate-x-1/2 w-full lg:w-[600px] flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all w-full md:my-4 md:max-w-3xl'>
                <div className='w-full mx-5 my-3 flex justify-between items-center sm:py-6 sm:px-1'>
                  <Dialog.Title as='h3' className='text-2md text-base-100 leading-6 py-4'>
                    {t('choose_cancellation_reason')}
                  </Dialog.Title>
                </div>
                <div className='px-none md:px-5'>
                  <Radio
                    options={reasons}
                    control={control}
                    color='bg-green-100 hover:bg-green-110 transition-all'
                    name='cancel_reason'
                    border={false}
                    className='p-none py-2 px-0'
                  />
                  {formState.cancel_reason === t('other_reason') && (
                    <DefaultInput
                      control={control}
                      name='custom_cancel_reason'
                      label={t('enter_reason')}
                      rows={6}
                      className='mb-8'
                      errors={errors.custom_cancel_reason}
                    />
                  )}
                </div>

                <div className='w-full flex items-center justify-center py-4 px-4 md:px-10 border-t-1 border-grey-90'>
                  <DefaultButton
                    bg='bg-orange-110'
                    text={t('approve')}
                    textColor='text-white'
                    type='submit'
                    disabled={!isValid}
                    onClick={() => {
                      cancelReservationMutation.mutate()
                      toggleModal()
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CancelReservationDialog
