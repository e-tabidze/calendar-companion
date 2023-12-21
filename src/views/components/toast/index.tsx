import Link from 'next/link'
import Typography from '../typography'

interface Props {
  type: 'success' | 'info' | 'error'
  title: string
  description: string
  path?: string
  permalink: string
}

const Toast: React.FC<Props> = ({ type, title, description, path, permalink }) => {
  return (
    <div
      className={`${
        type === 'success' ? 'bg-green-100' : type === 'info' ? 'bg-yellow-100' : type === 'error' ? 'bg-red-100' : ''
      } w-56 h-10`}
    >
      <Typography type='subtitle'>{title}</Typography>
      <Typography type='body'>{description}</Typography>
      {path && <Link href={path}>{permalink}</Link>}
    </div>
  )
}

export default Toast
