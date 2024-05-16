import CancelReservationDialog from 'src/views/components/cancelReservationDialog'

interface Props {
  open: boolean
  toggleModal: () => void
  orderId: number
}

const CancelReservation: React.FC<Props> = ({ open, toggleModal, orderId }) => {
  const options = [
    { label: 'მომხმარებელმა ჯავშანი გააუქმა', value: 'მომხმარებელმა ჯავშანი გააუქმა' },
    { label: 'ავტომობილი შესაკეთებელია', value: 'ავტომობილი შესაკეთებელია' },
    { label: 'სხვა ჯავშანი მივიღე', value: 'სხვა ჯავშანი მივიღე' },
    { label: 'არასწორი თარიღი მოინიშნა', value: 'არასწორი თარიღი მოინიშნა' },
    { label: 'სხვა მიზეზი', value: 'სხვა მიზეზი' }
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
