import CancelReservationDialog from 'src/views/components/cancelReservationDialog'

interface Props {
  open: boolean
  close: () => void
  orderId: number
}

const CancelOrder: React.FC<Props> = ({ open, close, orderId }) => {
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
    { label: 'სხვა მიზეზი', value: 'სხვა მიზეზი' }
  ]

  return <CancelReservationDialog reasons={options} orderStatus={7} open={open} toggleModal={close} orderId={orderId} />
}

export default CancelOrder
