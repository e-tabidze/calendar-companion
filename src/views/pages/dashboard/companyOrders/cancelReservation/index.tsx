import CancelReservationDialog from 'src/views/components/cancelReservationDialog'
import {useTranslation} from "next-i18next";

interface Props {
  open: boolean
  toggleModal: () => void
  orderId: number
}

const CancelReservation: React.FC<Props> = ({ open, toggleModal, orderId }) => {
  const {t} = useTranslation()

  const options = [
    { label: t('user_canceled_order'), value: t('user_canceled_order') },
    { label: t('vehicle_damaged'), value: t('vehicle_damaged') },
    { label: t('another_order'), value: t('another_order') },
    { label: t('incorrect_amount'), value: t('incorrect_amount')},
    { label: t('other_reason'), value: t('other_reason')}
  ]

  return (
    <CancelReservationDialog
      reasons={options}
      orderStatus={7}
      open={open}
      toggleModal={toggleModal}
      orderId={orderId}
    />
  )
}

export default CancelReservation
