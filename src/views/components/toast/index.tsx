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
      } px-6 py-4`}
    >
      <Typography type='subtitle' className='text-white text-md mb-2'>{title}</Typography>
      <Typography type='body' className='text-white text-2sm mb-2'>{description}</Typography>
      {path && <Link href={path} className='text-white text-2sm underline'>{permalink}</Link>}
    </div>
  )
}

export default Toast
