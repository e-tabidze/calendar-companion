import * as Yup from 'yup'

const CancelReservationSchema = Yup.object().shape({
  cancel_reason: Yup.string().required('required_field'),
  custom_cancel_reason: Yup.string().test('is-other', 'required_field', function (value) {
    const { cancel_reason } = this.parent
    if (cancel_reason === 'სხვა') {
        
      return !!value
    }

    return true
  })
})

export { CancelReservationSchema }
