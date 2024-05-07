import CancelReservationDialog from 'src/views/components/cancelReservationDialog'

interface Props {
  open: boolean
  toggleModal: () => void
  orderId: any
}

const CancelOrder: React.FC<Props> = ({ open, toggleModal, orderId }) => {
  const options = [
    { label: 'ავტომობილი გაქირავებულია', value: 'ავტომობილი გაქირავებულია' },
    { label: 'ავტომობილი მოსაწესრიგებელია', value: 'ავტომობილი მოსაწესრიგებელია' },
    {
      label: 'დამქირავებელს არ აქვს შესაბამისი ასაკი/მართვის მოწმობა',
      value: 'დამქირავებელს არ აქვს შესაბამისი ასაკი/მართვის მოწმობა'
    },
    {
      label: 'ავტომობილი არ ქირავდება ამ კონკრეტულ მომხმარებელზე',
      value: 'ავტომობილი არ ქირავდება ამ კონკრეტულ მომხმარებელზე'
    },
    { label: 'არ მსურს მითითებული თარიღების დაჯავშნა', value: 'არ მსურს მითითებული თარიღების დაჯავშნა' },
    { label: 'სხვა', value: 'სხვა' }
  ]

  return (
    <CancelReservationDialog
      reasons={options}
      orderStatus={2}
      open={open}
      toggleModal={toggleModal}
      orderId={orderId}
    />
  )
}

export default CancelOrder
