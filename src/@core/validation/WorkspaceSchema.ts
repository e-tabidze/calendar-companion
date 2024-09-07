import * as Yup from 'yup'

const WorkspaceSchema = Yup.object().shape({
  title: Yup.string().min(1, 'min 1').max(255, 'max chars').required('required')
})

export { WorkspaceSchema }
