import CancelReservationDialog from 'src/views/components/cancelReservationDialog'
import {useTranslation} from "next-i18next";

interface Props {
  open: boolean
  close: () => void
  orderId: number
}

const CancelOrder: React.FC<Props> = ({ open, close, orderId }) => {
  const {t} = useTranslation()

  const options = [
    { label: t('vehicle_is_rented'), value: t('vehicle_is_rented') },
    { label: t('vehicle_needs_clean'), value: t('vehicle_needs_clean') },
    {
      label: t('customer_has_no_driving_license'),
      value: t('customer_has_no_driving_license')
    },
    {
      label: t('no_rent_for_this_customer'),
      value: t('no_rent_for_this_customer')
    },
    { label: t('no_these_dates'), value: t('no_these_dates') },
    { label: t('other_reason'), value: t('other_reason') }
  ]

  return <CancelReservationDialog reasons={options} orderStatus={7} open={open} toggleModal={close} orderId={orderId} />
}

export default CancelOrder
